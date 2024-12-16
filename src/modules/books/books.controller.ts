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
@UseGuards(JwtAuthGuard)
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    @Roles(Role.ADMIN)
    async create(@Body() createBookRequestDto: CreateBookRequestDto) {
        return this.booksService.create(createBookRequestDto);
    }

    @Get()
    async findAll(@Query() { is_avaliable }: FindAllBooksDto) {
        return this.booksService.findAll(is_avaliable);
    }

    @Get(':id')
    async findOne(@Param() id: string) {
        return this.booksService.findOne(id);
    }
}
