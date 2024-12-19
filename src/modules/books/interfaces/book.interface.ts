import { Book, Prisma } from '@prisma/client';
import { FindAllBooksRepositoryDto } from '../dto/find-all-books-repository';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';

export interface BookInterface {
    create(data: Prisma.BookUncheckedCreateInput): Promise<void>;
    findAll(query: FindAllBooksRepositoryDto, page: number): Promise<Book[]>;
    updateAvailableStatus(
        updateBookStatusDto: UpdateBookStatusDto,
    ): Promise<void>;
}
