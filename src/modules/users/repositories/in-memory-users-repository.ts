import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import { IUserRepository } from '../interfaces/user.interface';
// import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class InMemoryUsersRepository implements IUserRepository {
    public prisma = new PrismaClient();
    public items = [];

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            fines: null,
            borrowings: null,
        };

        this.items.push(user);
    }

    async findAll() {
        const users = await this.prisma.user.findMany();

        return users;
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }

    async update(id: string, data: UpdateUserDto) {
        const updatedUser = await this.prisma.user.update({
            where: {
                id,
            },
            data: { ...data },
        });

        return updatedUser;
    }

    async delete(id: string) {
        const deletedUser = await this.prisma.user.delete({
            where: {
                id,
            },
        });

        return deletedUser;
    }
}
