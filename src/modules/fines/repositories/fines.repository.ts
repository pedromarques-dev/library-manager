import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { IFinesRepository } from '../interfaces/fines.interface';

export class FinesRepository implements IFinesRepository {
    private prisma: PrismaClient;

    constructor(private readonly prismaService: PrismaService) {
        this.prisma = new PrismaClient();
    }

    async findFirstFine(id: string) {
        const fine = await this.prisma.fine.findFirst({
            where: {
                user_id: id,
                paid_at: null,
            },
        });

        return fine;
    }

    async findAll(userId: string) {
        const fines = await this.prisma.fine.findMany({
            where: {
                user_id: userId,
            },
            include: {
                user: true,
            },
        });

        return fines;
    }

    async findUnique(id: string) {
        const fine = await this.prisma.fine.findUnique({
            where: {
                id,
            },
        });

        return fine;
    }

    async payFine(id: string) {
        await this.prisma.fine.update({
            where: {
                id,
            },
            data: {
                paid_at: new Date(),
            },
        });
    }

    async create(data: Prisma.FineUncheckedCreateInput) {
        await this.prismaService.fine.create({
            data: { ...data },
        });
    }
}
