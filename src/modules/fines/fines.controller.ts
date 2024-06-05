import { Controller, Post, Param } from '@nestjs/common';
import { FinesService } from './fines.service';
import { PayFineParamDto } from './dto/pay-fine-params.dto';

@Controller('fines')
export class FinesController {
    constructor(private readonly finesService: FinesService) {}

    @Post(':id')
    async pay(@Param() { id }: PayFineParamDto) {
        return this.finesService.payFine(id);
    }
}
