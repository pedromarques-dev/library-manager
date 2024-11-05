import { randomUUID } from 'crypto';

export const createUserMock = (data) => {
    const user = {
        id: randomUUID(),
        name: data.name ?? 'John Doe',
        email: data.email ?? 'johndoe@example.com',
        password: data.password ?? '123456',
        role: data.role,
        fines: data.fines ?? null,
        borrowings: data.borrowings ?? null,
    };

    return user;
};
