import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { getRole } from 'src/utils/get-role';
import { getTokenUser } from 'src/utils/get-token-user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly usersRepository: UsersRepository,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const { name, email, password, role } = createUserDto;

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
            role,
        });
    }

    async findAll() {
        const users = await this.usersRepository.findAll();

        return {
            users: users.map((user) => ({ ...user, password: undefined })),
        };
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }

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
        const userLogged = await getTokenUser(authorization);
        const userLoggedRole = await getRole(authorization);

        const isAdmin = userLoggedRole === 'ADMIN';

        if (!isAdmin && userLogged !== userExists.id) {
            throw new UnauthorizedException("You can't update other user");
        }

        const emailExists = await this.usersRepository.findByEmail(
            updateUserDto.email,
        );

        if (emailExists && userExists.email !== emailExists.email) {
            throw new ConflictException('Email already exists');
        }

        const user = await this.usersRepository.update(id, updateUserDto);

        return {
            ...user,
            password: undefined,
        };
    }

    async remove(id: string) {
        await this.usersRepository.delete(id);
    }
}
