import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    Headers,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticateHeadersDto } from '../auth/dto/authenticate-headers.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.USER)
    async update(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
        @Headers() { authorization }: AuthenticateHeadersDto,
    ) {
        return this.usersService.update(id, body, authorization);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @Roles(Role.ADMIN)
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
