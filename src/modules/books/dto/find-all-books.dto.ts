import {
    IsBooleanString,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export class FindAllBooksDto {
    @IsBooleanString()
    @IsOptional()
    is_avaliable: string;

    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    author_name: string;

    @IsNumberString()
    @IsOptional()
    year: number;

    @IsNumberString()
    @IsOptional()
    pages: number;

    @IsNumberString()
    @IsOptional()
    page: number;

    @IsString()
    @IsOptional()
    category: string;
}
