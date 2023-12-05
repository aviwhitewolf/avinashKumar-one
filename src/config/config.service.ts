import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migration/**/*.js'],
  synchronize: process.env.NODE_ENV !== 'production', // Only synchronize in non-production environments
  logging: process.env.NODE_ENV !== 'production', // Enable logging in non-production environments
}; // Type assertion here

export default config;
