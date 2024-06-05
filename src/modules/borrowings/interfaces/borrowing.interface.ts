import { Borrowing, Prisma } from '@prisma/client';
import { ReturnBookDto } from '../dto/update-borrowing.dto';

export interface IBorrowingRepository {
    reserve(data: Prisma.BorrowingUncheckedCreateInput): Promise<void>;
    returnBook(data: ReturnBookDto): Promise<void>;
    findAllBorrowings(id: string, finished_at: Date): Promise<Borrowing[]>;
    findOne(id: string): Promise<Borrowing | null>;
}
