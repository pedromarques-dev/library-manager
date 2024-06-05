import { Category } from '@prisma/client';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsArray()
    @IsNotEmpty()
    categories: Category[];

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
