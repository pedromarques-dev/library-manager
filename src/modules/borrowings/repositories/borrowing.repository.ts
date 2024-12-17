import { Borrowing, Prisma, PrismaClient } from '@prisma/client';
import { ReturnBookDto } from '../dto/update-borrowing.dto';
import { IBorrowingRepository } from '../interfaces/borrowing.interface';

export class BorrowingRepository implements IBorrowingRepository {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async reserve(data: Prisma.BorrowingUncheckedCreateInput) {
        await this.prisma.borrowing.create({
            data: {
                ...data,
            },
        });
    }

    async findOne(id: string): Promise<Borrowing | null> {
        const borrowing = await this.prisma.borrowing.findUnique({
            where: {
                id,
            },
        });

        if (!borrowing) {
            return null;
        }

        return borrowing as Borrowing;
    }

    async returnBook({ id }: ReturnBookDto) {
        await this.prisma.borrowing.update({
            where: {
                id,
            },
            data: {
                finished_at: new Date(),
            },
        });
    }

    async findAllBorrowings({
        userId,
        finished_at,
    }: {
        userId: string;
        finished_at: string;
    }) {
        const borrowings = await this.prisma.borrowing.findMany({
            where: {
                finished_at,
                user_id: userId,
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                book: true,
            },
        });

        return borrowings;
    }

    async findOneBorrowingById(id: string) {
        const borrowing = await this.prisma.borrowing.findMany({
            where: {
                id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                book: true,
            },
        });

        return borrowing;
    }
}
