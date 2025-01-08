import {
    Body,
    Controller,
    Get,
    Headers,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { AuthenticateHeadersDto } from '../auth/dto/authenticate-headers.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { BorrowingsService } from './borrowings.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBookDto } from './dto/update-borrowing.dto';

@Controller('borrowings')
@UseGuards(JwtAuthGuard)
export class BorrowingsController {
    constructor(private readonly borrowingsService: BorrowingsService) {}

    @Post()
    @Roles(Role.USER)
    async reserve(
        @Body() createBorrowingDto: CreateBorrowingDto,
        @Headers() { authorization }: AuthenticateHeadersDto,
    ) {
        return this.borrowingsService.reserve(
            createBorrowingDto,
            authorization,
        );
    }

    @Post('/return')
    @Roles(Role.USER)
    async returnBook(
        @Body() returnBookDto: ReturnBookDto,
        @Headers() { authorization }: AuthenticateHeadersDto,
    ) {
        return this.borrowingsService.returnBook(returnBookDto, authorization);
    }

    @Get()
    async findAllBorrowings(
        @Headers() { authorization }: AuthenticateHeadersDto,
        @Query() query: { userId: string; finishedAt: string },
    ) {
        return this.borrowingsService.findAllBorrowings(
            authorization,
            query.finishedAt,
            query.userId,
        );
    }

    @Get(':id')
    async findOneBorrowing(@Param() { id }: { id: string }) {
        return this.borrowingsService.findBorrowingById(id);
    }
}
