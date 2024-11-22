# configured aws provider with proper credentials
provider "aws" {
  region  = "us-east-2"
}

variable "key_name" {}

resource "tls_private_key" "example" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = var.key_name
  public_key = tls_private_key.example.public_key_openssh
}

# create default vpc if one does not exit
resource "aws_default_vpc" "default_vpc" {

  tags = {
    Name = "default vpc"
  }
}


# use data source to get all avalablility zones in region
data "aws_availability_zones" "available_zones" {}


# create default subnet if one does not exit
resource "aws_default_subnet" "default_az1" {
  availability_zone = data.aws_availability_zones.available_zones.names[0]

  tags = {
    Name = "default subnet"
  }
}


# create security group for the ec2 instance
resource "aws_security_group" "ec2_security_group" {
  name        = "ec2 security group"
  description = "allow access on ports 3333 and 22"
  vpc_id      = aws_default_vpc.default_vpc.id

  ingress {
    description = "http access"
    from_port   = 3333
    to_port     = 3333
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "ssh access"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    protocol  = "tcp"
    from_port = 5432
    to_port   = 5432
    cidr_blocks = ["0.0.0.0/0"]

  }

  tags = {
    Name = "docker server sg"
  }
}


data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm*"]
  }
}


resource "aws_instance" "ec2_instance" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = "t2.micro"
  subnet_id              = aws_default_subnet.default_az1.id
  vpc_security_group_ids = [aws_security_group.ec2_security_group.id]
  key_name               = aws_key_pair.generated_key.key_name

  tags = {
    Name = "docker server"
  }
}

output "private_key" {
  value     = tls_private_key.example.private_key_pem
  sensitive = true
}
resource "null_resource" "name" {

  connection {
    type        = "ssh"
    user        = "ec2-user"
    private_key = tls_private_key.example.private_key_pem
    host        = aws_instance.ec2_instance.public_ip
  }

  provisioner "file" {
    source = ".env"
    destination = "/home/ec2-user/.env"
  }

  provisioner "file" {
   source      = ".docker_password.txt"
   destination = "/home/ec2-user/.docker_password.txt"

   }
  provisioner "file" {
    source      = "Dockerfile"
    destination = "/home/ec2-user/Dockerfile"
  }



  provisioner "file" {
    source      = "deployment.sh"
    destination = "/home/ec2-user/deployment.sh"
  }

  provisioner "remote-exec" {
    inline = [
      "sudo chmod +x /home/ec2-user/deployment.sh",
      "sh /home/ec2-user/deployment.sh",
    ]
  }

  depends_on = [aws_instance.ec2_instance]

}
output "container_url" {
  value = join("", ["http://", aws_instance.ec2_instance.public_dns])
}
