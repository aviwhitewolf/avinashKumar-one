import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { AccessCheckGuard } from 'src/auth/guards/access-check.guard';
import { UserService } from 'src/auth/user.service';
import { User } from 'src/auth/entities/user.entity';
import { Role } from 'src/auth/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Product])],
  controllers: [ProductController],
  providers: [ProductService, JwtStrategy, AccessCheckGuard, UserService],
})
export class ProductModule {}
