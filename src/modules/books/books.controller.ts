import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { FindAllBooksDto } from './dto/find-all-books.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    async create(@Body() createBookRequestDto: CreateBookRequestDto) {
        return this.booksService.create(createBookRequestDto);
    }

    @Get()
    async findAll(@Query() { is_avaliable }: FindAllBooksDto) {
        return this.booksService.findAll(is_avaliable);
    }
}
