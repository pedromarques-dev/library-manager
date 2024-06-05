import { Module } from '@nestjs/common';
import { BorrowingsService } from './borrowings.service';
import { BorrowingsController } from './borrowings.controller';
import { BorrowingRepository } from './repositories/borrowing.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BooksRepository } from '../books/repositories/books.repositories';
import { UsersRepository } from '../users/repositories/users.repository';
import { FinesRepository } from '../fines/repositories/fines.repository';

@Module({
    imports: [PrismaModule],
    controllers: [BorrowingsController],
    providers: [
        BorrowingsService,
        BorrowingRepository,
        BooksRepository,
        UsersRepository,
        FinesRepository,
    ],
})
export class BorrowingsModule {}
