import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly userRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto) {
    try {
      const role = this.userRepository.create(createRoleDto);
      await this.userRepository.save(role);
      return role;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }
}
