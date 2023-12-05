import { IsEmail, IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 500)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
