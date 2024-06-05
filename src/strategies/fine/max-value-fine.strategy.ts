import { FineStrategy } from './fine.strategy';

export class MaxValueFineStrategy extends FineStrategy {
    async calculate(userId: string, totalValue: number) {
        await this.repository.create({
            reason: 'Atraso na devolução do livro',
            value: `R$${totalValue}`,
            user_id: userId,
        });
    }
}
