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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticateHeadersDto } from '../auth/dto/authenticate-headers.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(201)
    async create(@Body() body: CreateUserDto) {
        return this.usersService.create(body);
    }

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
        @Headers() { authorization }: AuthenticateHeadersDto,
    ) {
        return this.usersService.update(id, body, authorization);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
