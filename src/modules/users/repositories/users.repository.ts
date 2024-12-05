import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../interfaces/user.interface';

@Injectable()
export class UsersRepository implements IUserRepository {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput) {
        try {
            await this.prisma.user.create({
                data,
            });
        } catch (error) {
            console.log(error);
        }
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
