import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './jwt/jwt-strategy';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10000s' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
