import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  async register(@Body(new ValidationPipe()) user: CreateUserDto) {
    return await this.authService.register(user);
  }

  @Post('/role/create')
  async createRole(@Body(new ValidationPipe()) role: CreateRoleDto) {
    return await this.authService.createRole(role);
  }
}
