import { Module } from '@nestjs/common';
import { FinesController } from './fines.controller';
import { FinesService } from './fines.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FinesRepository } from './repositories/fines.repository';

@Module({
    controllers: [FinesController],
    providers: [FinesService, PrismaService, FinesRepository],
})
export class FinesModule {}
