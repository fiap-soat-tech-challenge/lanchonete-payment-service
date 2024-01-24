import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';

export const getTypeOrmModuleOptions = (
  envie: EnvironmentService,
): TypeOrmModuleOptions =>
  ({
    type: 'mongodb',
    useUTC: false,
    host: envie.getDatabaseHost(),
    port: envie.getDatabasePort(),
    username: envie.getDatabaseUser(),
    password: envie.getDatabasePassword(),
    database: envie.getDatabaseName(),
    authSource: 'admin',
    synchronize: envie.getDatabaseSync(),
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    logging: 'all',
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentModule],
      inject: [EnvironmentService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}
