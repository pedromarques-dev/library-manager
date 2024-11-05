import { beforeEach, describe, it } from 'vitest';
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repository';
import { UsersService } from '../users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUserMock } from './mocks/create-user-mock';

let usersRepository: InMemoryUsersRepository;
let prismaService: PrismaService;
let usersService: UsersService;

describe('Users Service', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        prismaService = new PrismaService();
        usersService = new UsersService(prismaService, usersRepository);
    });

    it('Should be able to create a user', async () => {
        const newUser = createUserMock({ role: 'ADMIN' });

        const teste = await usersService.create(newUser);

        console.log(teste);
    });
});
