import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'test') {
      return {
        type: 'mongodb',
        database: ':memory:',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      };
    }

    return {
      type: 'mongodb',
      url: this.configService.get('DB_URL'),
      authSource: 'admin',
      database: this.configService.get('DB_NAME'),
      synchronize: this.boolean(this.configService.get('DB_SYNCHRONIZE')),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    };
  }

  private boolean(strValue: string): boolean {
    return /^\s*(true|1)\s*$/i.test(strValue);
  }
}
