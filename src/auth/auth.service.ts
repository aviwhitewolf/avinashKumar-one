import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private roleService: RoleService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.getUserByUsername(username);
      if (user && user.password === pass) {
        delete user.password;
        return user;
      }
      return null;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: {
        name: user.username,
        id: user.id,
      },
    };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    await this.usersService.createUser(user);
  }

  async createRole(role: CreateRoleDto) {
    await this.roleService.createRole(role);
  }
}
