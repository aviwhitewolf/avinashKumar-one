import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getUserByUsername(username: string) {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { roleId, ...rest } = createUserDto;
      const role = await this.roleRepository.findOne({ where: { id: roleId } });

      const user = this.userRepository.create({
        ...rest,
        role,
      });
      const createUser = await this.userRepository.save(user);
      delete createUser.password;
      return createUser;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async getUserPermission(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username },
        relations: ['role'],
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }
}
