import { Injectable, NotFoundException } from '@nestjs/common';
import { getRole } from 'src/utils/get-role';
import { getTokenUser } from 'src/utils/get-token-user';
import { FinesRepository } from './repositories/fines.repository';

@Injectable()
export class FinesService {
    constructor(private readonly finesRepository: FinesRepository) {}

    async payFine(id: string) {
        await this.finesRepository.payFine(id);
    }

    async findAll(authorization: string) {
        const userId = await getTokenUser(authorization);
        const userRole = await getRole(authorization);
        const fines = await this.finesRepository.findAll(
            userRole === 'USER' ? userId : undefined,
        );
        return fines;
    }

    async findOne(id: string) {
        const fine = await this.finesRepository.findUnique(id);

        if (!fine) {
            throw new NotFoundException('Multa não encontrada!');
        }
        return fine;
    }
}
