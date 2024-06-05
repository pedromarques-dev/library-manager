import { IsString } from 'class-validator';

export class AuthenticateHeadersDto {
    @IsString()
    authorization: string;
}
