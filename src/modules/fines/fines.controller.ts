import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { FinesService } from './fines.service';
import { PayFineParamDto } from './dto/pay-fine-params.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from '@prisma/client';

@Controller('fines')
@UseGuards(JwtAuthGuard)
export class FinesController {
    constructor(private readonly finesService: FinesService) {}

    @Post(':id')
    @Roles(Role.USER)
    async pay(@Param() { id }: PayFineParamDto) {
        return this.finesService.payFine(id);
    }
}
