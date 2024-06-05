import { IFinesRepository } from '../interfaces/fines.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

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
