import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { getTokenUser } from './get-token-user';

export const getRole = async (authorization: string) => {
    const prisma = new PrismaService();

    const id = await getTokenUser(authorization);

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    if (!user.role) {
        throw new UnauthorizedException('Token de autenticação nao encontrado');
    }
    return user.role;
};
