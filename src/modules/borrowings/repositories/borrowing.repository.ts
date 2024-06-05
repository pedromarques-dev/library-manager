import { ReturnBookDto } from '../dto/update-borrowing.dto';
import { IBorrowingRepository } from '../interfaces/borrowing.interface';
import { Prisma, PrismaClient } from '@prisma/client';

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

    async findOne(id: string) {
        const borrowing = await this.prisma.borrowing.findUnique({
            where: {
                id,
            },
        });

        return borrowing;
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

    async findAllBorrowings(id: string, finished_at: Date) {
        const borrowings = await this.prisma.borrowing.findMany({
            where: {
                finished_at: !finished_at ? null : undefined,
                user_id: id,
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
}
