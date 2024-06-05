import { Book, Prisma } from '@prisma/client';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';

export interface BookInterface {
    create(data: Prisma.BookUncheckedCreateInput): Promise<void>;
    findAll(is_avaliable: string): Promise<Book[]>;
    updateAvailableStatus(
        updateBookStatusDto: UpdateBookStatusDto,
    ): Promise<void>;
}
