import { Role } from '@prisma/client';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres!' })
    name: string;

    @IsEmail({}, { message: 'Voce deve informar um email valido!' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Senha obrigatoria!' })
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    role: Role;
}
