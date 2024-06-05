import { IsNotEmpty, IsUUID } from 'class-validator';

export class PayFineParamDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
