import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { UserInterface } from '../interfaces/user.interface';

@Injectable()
export class UsersRepository implements UserInterface {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput) {
        await this.prisma.user.create({
            data,
        });
    }

    async findAll() {
        const users = await this.prisma.user.findMany({
            include: {
                fines: {
                    orderBy: {
                        paid_at: 'desc',
                    },
                },
            },
        });

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
