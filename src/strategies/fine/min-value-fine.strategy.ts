import { FineStrategy } from './fine.strategy';

export class MinValueFineStrategy extends FineStrategy {
    async calculate(userId: string) {
        await this.repository.create({
            reason: 'Atraso na devolução do livro',
            value: 'R$5,00',
            user_id: userId,
        });
    }
}
