import { DatabaseConfig } from './database.config';
import { ConfigService } from '@nestjs/config';

jest.mock('@nestjs/config');

describe('DatabaseConfig', () => {
  let configService: jest.Mocked<ConfigService>;
  let databaseConfig: DatabaseConfig;

  beforeEach(async () => {
    configService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    databaseConfig = new DatabaseConfig(configService);
  });

  it('should be defined', () => {
    expect(databaseConfig).toBeDefined();
  });

  describe('createTypeOrmOptions', () => {
    it('should create options for test environment', () => {
      process.env.NODE_ENV = 'test';
      const options = databaseConfig.createTypeOrmOptions();
      expect(options).toEqual({
        type: 'mongodb',
        database: ':memory:',
        entities: [expect.any(String)],
        synchronize: true,
      });
    });

    it('should create options with DB_URL', () => {
      process.env.NODE_ENV = 'production';
      configService.get.mockReturnValueOnce('mongodb://localhost:27017');
      configService.get.mockReturnValueOnce('mongodb://localhost:27017');
      configService.get.mockReturnValueOnce('mydb');
      configService.get.mockReturnValueOnce('false');
      const options = databaseConfig.createTypeOrmOptions();
      expect(options).toEqual({
        type: 'mongodb',
        url: 'mongodb://localhost:27017',
        authSource: 'admin',
        database: 'mydb',
        synchronize: false,
        entities: [expect.any(String)],
      });
    });

    it('should create options without DB_URL', () => {
      process.env.NODE_ENV = 'production';
      configService.get.mockReturnValueOnce(undefined);
      configService.get.mockReturnValueOnce('localhost');
      configService.get.mockReturnValueOnce('27017');
      configService.get.mockReturnValueOnce('myuser');
      configService.get.mockReturnValueOnce('mypassword');
      configService.get.mockReturnValueOnce('mydb');
      configService.get.mockReturnValueOnce('true');
      const options = databaseConfig.createTypeOrmOptions();
      expect(options).toEqual({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        username: 'myuser',
        password: 'mypassword',
        authSource: 'admin',
        database: 'mydb',
        synchronize: true,
        entities: [expect.any(String)],
      });
    });
  });
});
