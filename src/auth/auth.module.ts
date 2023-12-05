import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { LocalStrategy } from './strategies/local-strategy';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

@Module({
  controllers: [AuthController],
  providers: [RoleService, AuthService, UserService, LocalStrategy],
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: `${process.env.JWT_SCERET}`,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
