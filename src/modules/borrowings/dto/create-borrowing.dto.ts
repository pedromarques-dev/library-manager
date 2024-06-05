import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBorrowingDto {
    @IsUUID()
    @IsNotEmpty()
    bookId: string;
}
