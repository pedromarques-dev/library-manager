import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllBooksRepositoryDto } from '../dto/find-all-books-repository';
import { UpdateBookStatusDto } from '../dto/update-book-status.dto';
import { BookInterface } from '../interfaces/book.interface';

@Injectable()
export class BooksRepository implements BookInterface {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.BookUncheckedCreateInput) {
        await this.prisma.book.create({
            data: {
                ...data,
            },
        });
    }

    async findAll(query: FindAllBooksRepositoryDto, page: number) {
        const perPage = 10;
        const books = await this.prisma.book.findMany({
            where: {
                author_name: {
                    contains: query.author_name,
                },
                title: {
                    contains: query.title,
                },
                year: query.year,
                pages: {
                    gte: query.pages,
                },
                is_avaliable: query.is_avaliable,
                categories: {
                    some: {
                        name: query.category,
                    },
                },
            },
            orderBy: {
                borrowings: {
                    _count: 'desc',
                },
            },
            take: perPage,
            skip: (page - 1) * perPage,
            include: {
                categories: true,
            },
        });

        return books;
    }

    async findOne(id: string) {
        const book = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });

        return book;
    }

    async updateAvailableStatus(updateBookStatusDto: UpdateBookStatusDto) {
        await this.prisma.book.update({
            where: {
                id: updateBookStatusDto.book_id,
            },
            data: {
                is_avaliable: updateBookStatusDto.is_available,
            },
        });
    }

    async findAllCategories() {
        return await this.prisma.category.findMany({
            orderBy: {
                book: {
                    _count: 'desc',
                },
            },
        });
    }
}
