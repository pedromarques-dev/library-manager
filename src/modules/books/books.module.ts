import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BooksRepository } from './repositories/books.repositories';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [BooksController],
    providers: [BooksService, BooksRepository, PrismaService],
})
export class BooksModule {}
