import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { getTokenUser } from 'src/utils/get-token-user';

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersRepository: UsersRepository,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { name, email, password } = createUserDto;

        const userWithSameEmail = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });

        if (userWithSameEmail) {
            throw new ConflictException('Email already exists');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
        });
    }

    async findAll() {
        const users = await this.usersRepository.findAll();

        return {
            users,
        };
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findOne(id);

        return {
            user,
        };
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
        authorization: string,
    ) {
        const userExists = await this.usersRepository.findOne(id);

        if (!userExists) {
            throw new NotFoundException('User not found.');
        }

        const userLogged = getTokenUser(authorization);

        const emailExists = await this.usersRepository.findByEmail(
            updateUserDto.email,
        );

        if (emailExists && userExists.email !== emailExists.email) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.usersRepository.update(
            userLogged,
            updateUserDto,
        );

        return {
            ...user,
            password: undefined,
        };
    }

    async remove(id: string) {
        await this.usersRepository.delete(id);
    }
}
