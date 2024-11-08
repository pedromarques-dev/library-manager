import { PrismaService } from 'src/prisma/prisma.service';
import { getTokenUser } from './get-token-user';

export const getRole = async (authorization: string) => {
    const prisma = new PrismaService();

    const id = getTokenUser(authorization);

    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    return user.role;
};
