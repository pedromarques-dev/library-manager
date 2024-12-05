import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateDto {
    @IsEmail({}, { message: 'Você deve informar um email valido!' })
    @IsNotEmpty({ message: 'Email obrigatorio!' })
    email: string;

    @IsString({ message: 'Você deve informar uma senha valida!' })
    @IsNotEmpty({ message: 'Senha obrigatoria!' })
    password: string;
}
