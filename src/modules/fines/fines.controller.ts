import {
    Controller,
    Get,
    Headers,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PayFineParamDto } from './dto/pay-fine-params.dto';
import { FinesService } from './fines.service';

@Controller('fines')
@UseGuards(JwtAuthGuard)
export class FinesController {
    constructor(private readonly finesService: FinesService) {}

    @Post(':id')
    @Roles(Role.USER)
    async pay(@Param() { id }: PayFineParamDto) {
        return this.finesService.payFine(id);
    }

    @Get()
    async findAll(@Headers() { authorization }: { authorization: string }) {
        return this.finesService.findAll(authorization);
    }

    @Get(':id')
    async findOne(@Param() id: string) {
        return this.finesService.findOne(id);
    }
}
