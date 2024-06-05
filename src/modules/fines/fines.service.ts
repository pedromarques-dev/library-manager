import { Injectable } from '@nestjs/common';
import { FinesRepository } from './repositories/fines.repository';

@Injectable()
export class FinesService {
    constructor(private readonly finesRepository: FinesRepository) {}

    async payFine(id: string) {
        await this.finesRepository.payFine(id);
    }
}
