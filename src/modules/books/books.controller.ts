import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { BooksService } from './books.service';
import { CreateBookRequestDto } from './dto/create-book-request.dto';
import { FindAllBooksDto } from './dto/find-all-books.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard)
    async create(@Body() createBookRequestDto: CreateBookRequestDto) {
        return this.booksService.create(createBookRequestDto);
    }

    @Get()
    async findAll(@Query() query: FindAllBooksDto) {
        return this.booksService.findAll(query, Number(query.page));
    }

    @Get('/categories')
    async findAllCategories() {
        return this.booksService.findAllCategories();
    }

    @Get(':id')
    async findOne(@Param() { id }: { id: string }) {
        return this.booksService.findOne(id);
    }
}
