import { JwtService } from '@nestjs/jwt';

export async function getTokenUser(authorization: string) {
    const jwt = new JwtService();

    const token = authorization.slice(7);

    const userLogged = await jwt.decode(token);

    return userLogged.sub;
}
