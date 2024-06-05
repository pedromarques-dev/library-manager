import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

interface ICategory {
    name: string;
}

export class CreateBookRequestDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    categories: ICategory[];

    @IsString()
    @IsNotEmpty()
    author_name: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsNumber()
    @IsNotEmpty()
    pages: number;

    @IsBoolean()
    @IsOptional()
    is_avaliable: boolean;
}
