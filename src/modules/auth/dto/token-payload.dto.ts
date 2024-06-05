import { IsNotEmpty, IsUUID } from 'class-validator';

export class TokenPayloadDto {
    @IsUUID()
    @IsNotEmpty()
    sub: string;
}
