import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { FindAllBooksDto } from './dto/find-all-books.dto';
import { UpdateBookStatusDto } from './dto/update-book-status.dto';
import { BooksRepository } from './repositories/books.repositories';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository) {}

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

    async findAll(query: FindAllBooksDto, page: number) {
        let isAvaliable = query.is_avaliable === 'true';
        if (!query.is_avaliable) {
            delete query.is_avaliable;
            isAvaliable = undefined;
        }

        const queryParams = {
            ...query,
            year: query.year ? Number(query.year) : undefined,
            pages: query.pages ? Number(query.pages) : undefined,
            is_avaliable: isAvaliable,
        };

        const booksAvaliables = await this.booksRepository.findAll(
            queryParams,
            page,
        );

        return booksAvaliables;
    }

    async findOne(id: string) {
        const book = await this.booksRepository.findOne(id);

        if (!book) {
            throw new NotFoundException('Livro não encontrado');
        }

        return book;
    }

    async updateStatus(updateBookStatusDto: UpdateBookStatusDto) {
        const { is_available, book_id } = updateBookStatusDto;
        await this.booksRepository.updateAvailableStatus({
            is_available,
            book_id,
        });
    }

    async findAllCategories() {
        const categories = await this.booksRepository.findAllCategories();

        return categories;
    }
}
