import {
    IsBoolean,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export class FindAllBooksRepositoryDto {
    @IsBoolean()
    @IsOptional()
    is_avaliable: boolean;

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
