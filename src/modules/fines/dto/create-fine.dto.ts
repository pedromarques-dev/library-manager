import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateFineDto {
    @IsString()
    @IsNotEmpty()
    reason: string;

    @IsString()
    @IsNotEmpty()
    value: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;
}
