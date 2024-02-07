import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from '../database/database.config';

@Module({
  imports: [
    TerminusModule,
    HttpModule,
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
