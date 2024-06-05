import { JwtService } from '@nestjs/jwt';

export function getTokenUser(authorization: string) {
    const jwt = new JwtService();

    const token = authorization.slice(7);

    const userLogged = jwt.decode(token);

    return userLogged.sub;
}
