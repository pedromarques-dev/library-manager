import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export const userRepository = 'USER REPOSITORY';
export interface IUserRepository {
    create(data: CreateUserDto): Promise<void>;
    update(id: string, data: UpdateUserDto): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    delete(id: string): Promise<User>;
}
