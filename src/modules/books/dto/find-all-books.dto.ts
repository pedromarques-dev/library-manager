import { IsBooleanString, IsOptional } from 'class-validator';

export class FindAllBooksDto {
    @IsBooleanString()
    @IsOptional()
    is_avaliable: string;
}
