import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
  SUPPORTER = 'SUPPORTER',
  CUSTOMER = 'CUSTOMER',
}

export const PermissionMapping = {
  create: 'POST',
  update: 'PUT',
  fetch: 'GET',
  delete: 'DELETE',
};

export class CreateRoleDto {
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  name: string;

  @IsNotEmpty()
  permission: any;
}
