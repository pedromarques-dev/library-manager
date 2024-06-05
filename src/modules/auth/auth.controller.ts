import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async create(@Body() body: AuthenticateDto) {
        return this.authService.login(body);
    }
}
