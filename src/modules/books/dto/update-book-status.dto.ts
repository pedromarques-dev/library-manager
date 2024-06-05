import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBookStatusDto {
    @IsUUID()
    @IsNotEmpty()
    book_id: string;

    @IsBoolean()
    @IsNotEmpty()
    is_available: boolean;
}
