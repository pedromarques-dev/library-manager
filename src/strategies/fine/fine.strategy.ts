import { FinesRepository } from 'src/modules/fines/repositories/fines.repository';
import { PrismaService } from 'src/prisma/prisma.service';

export abstract class FineStrategy {
    private readonly prismaService = new PrismaService();
    protected readonly repository = new FinesRepository(this.prismaService);

    abstract calculate(
        userId: string,
        borrowingId: string,
        totalValue?: number,
    ): void;
}
