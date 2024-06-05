import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { AuthenticateDto } from './dto/authenticate.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async login(authenticateDto: AuthenticateDto) {
        const { email, password } = authenticateDto;

        const emailExists = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (!emailExists) {
            throw new BadRequestException('Invalid Credentials');
        }

        const isPasswordMatch = await compare(password, emailExists.password);

        if (!isPasswordMatch) {
            throw new BadRequestException('Invalid Credentials');
        }

        const tokenPayload = { sub: emailExists.id };

        const access_token = await this.jwtService.signAsync(tokenPayload);

        return {
            access_token,
        };
    }
}
