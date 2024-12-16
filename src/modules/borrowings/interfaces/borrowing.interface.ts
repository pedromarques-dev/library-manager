import { Borrowing, Prisma } from '@prisma/client';
import { ReturnBookDto } from '../dto/update-borrowing.dto';

export interface IBorrowingRepository {
    reserve(data: Prisma.BorrowingUncheckedCreateInput): Promise<void>;
    returnBook(data: ReturnBookDto): Promise<void>;
    findAllBorrowings({
        userId,
        finished_at,
    }: {
        userId: string;
        finished_at: string;
    }): Promise<Borrowing[]>;
    findOne(id: string): Promise<Borrowing | null>;
}
