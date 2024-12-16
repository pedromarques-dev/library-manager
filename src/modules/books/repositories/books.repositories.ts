import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
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

    async findAll(is_avaliable: string) {
        const books = await this.prisma.book.findMany({
            where: {
                is_avaliable: is_avaliable
                    ? is_avaliable === 'true'
                    : undefined,
            },
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
        console.log(updateBookStatusDto);
        await this.prisma.book.update({
            where: {
                id: updateBookStatusDto.book_id,
            },
            data: {
                is_avaliable: updateBookStatusDto.is_available,
            },
        });
    }
}
