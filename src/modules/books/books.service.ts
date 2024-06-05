import { Injectable } from '@nestjs/common';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { BooksRepository } from './repositories/books.repositories';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
    constructor(
        private readonly booksRepository: BooksRepository,
        private readonly prismaService: PrismaService,
    ) {}

    async create(createBookRequestDto: CreateBookRequestDto) {
        const { author_name, categories, pages, title, year, is_avaliable } =
            createBookRequestDto;

        await this.booksRepository.create({
            author_name,
            pages,
            categories: {
                create: [...categories],
            },
            title,
            year,
            is_avaliable,
        });
    }

    async findAll(isAvaliable: string) {
        const booksAvaliables = await this.booksRepository.findAll(isAvaliable);

        return booksAvaliables;
    }

    async updateStatus(updateBookStatusDto: UpdateBookStatusDto) {
        const { is_available, book_id } = updateBookStatusDto;
        await this.booksRepository.updateAvailableStatus({
            is_available,
            book_id,
        });
    }
}
