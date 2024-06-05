import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Headers,
} from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { CreateBorrowingDto } from './dto/create-borrowing.dto';
import { ReturnBookDto } from './dto/update-borrowing.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { AuthenticateHeadersDto } from '../auth/dto/authenticate-headers.dto';
import { FindAllBorrowingsDto } from './dto/find-all-borrowings.dto';

@Controller('borrowings')
@UseGuards(JwtAuthGuard)
export class BorrowingsController {
    constructor(private readonly borrowingsService: BorrowingsService) {}

    @Post()
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
    async returnBook(
        @Body() returnBookDto: ReturnBookDto,
        @Headers() { authorization }: AuthenticateHeadersDto,
    ) {
        return this.borrowingsService.returnBook(returnBookDto, authorization);
    }

    @Get()
    async findAllBorrowingsInProgress(
        @Body() body: FindAllBorrowingsDto,
        @Headers() { authorization }: AuthenticateHeadersDto,
    ) {
        return this.borrowingsService.findAllBorrowings(body, authorization);
    }
}
