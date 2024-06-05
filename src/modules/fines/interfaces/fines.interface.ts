import { Fine, Prisma } from '@prisma/client';

export interface IFinesRepository {
    findFirstFine(id: string): Promise<Fine | null>;
    payFine(id: string): Promise<void>;
    create(data: Prisma.FineUncheckedCreateInput): Promise<void>;
}
