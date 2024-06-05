import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReturnBookDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
