import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { InMemoryUsersRepository } from './repositories/in-memory-users-repository';
import { userRepository } from './interfaces/user.interface';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        PrismaService,
        {
            useClass: UsersRepository,
            provide: userRepository,
        },
        {
            useClass: InMemoryUsersRepository,
            provide: userRepository,
        },
    ],
})
export class UsersModule {}
