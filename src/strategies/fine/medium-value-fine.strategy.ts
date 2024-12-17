import { FineStrategy } from './fine.strategy';

export class MediumValueFineStrategy extends FineStrategy {
    async calculate(userId: string, borrowingId: string) {
        await this.repository.create({
            reason: 'Atraso na devolução do livro',
            value: 'R$10,00',
            user_id: userId,
            borrowing_id: borrowingId,
        });
    }
}
