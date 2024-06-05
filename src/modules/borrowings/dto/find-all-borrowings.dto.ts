import { IsDateString, IsOptional } from 'class-validator';

export class FindAllBorrowingsDto {
    @IsDateString()
    @IsOptional()
    finishedAt: Date;
}
