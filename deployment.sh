
#!/bin/bash

# install and configure docker on the ec2 instance
sudo yum update -y
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo systemctl enable docker

# create a dockerfile

#cat ~/my_password.txt | sudo docker login --username <your-docker-id> --password-stdin
cat ~/.docker_password.txt | sudo docker login --username pedromarquesdocker --password-stdin

# start the container to test the image
#sudo docker run -dp 80:80 <repository-name> 
sudo docker run --env-file ~/.env -dp 3333:3333 pedromarquesdocker/library-manager-api:v4.2

