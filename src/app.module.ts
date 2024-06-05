import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { BorrowingsModule } from './modules/borrowings/borrowings.module';
import { AuthModule } from './modules/auth/auth.module';
import { FinesModule } from './modules/fines/fines.module';

@Module({
    imports: [
        UsersModule,
        BooksModule,
        BorrowingsModule,
        AuthModule,
        FinesModule,
    ],
})
export class AppModule {}
