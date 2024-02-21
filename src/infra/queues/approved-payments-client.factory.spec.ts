import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { instance, mock, when } from 'ts-mockito';
import { ApprovedPaymentsClientFactory } from './approved-payments-client.factory';
import * as process from 'process';

describe('ApprovedPaymentsClientFactory', () => {
  let factory: ApprovedPaymentsClientFactory;
  let configService: ConfigService;

  beforeEach(async () => {
    configService = mock(ConfigService);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApprovedPaymentsClientFactory,
        { provide: ConfigService, useValue: instance(configService) },
      ],
    }).compile();

    factory = module.get<ApprovedPaymentsClientFactory>(
      ApprovedPaymentsClientFactory,
    );
  });

  it('should be defined', async () => {
    process.env.QUEUE_USER = 'user';
    process.env.QUEUE_PASSWORD = 'password';
    process.env.QUEUE_HOST = 'localhost';

    when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
    when(configService.get('QUEUE_PASSWORD')).thenReturn(
      process.env.QUEUE_PASSWORD,
    );
    when(configService.get('QUEUE_URI')).thenReturn(process.env.QUEUE_URI);

    expect(factory).toBeDefined();
  });

  describe('createClientOptions', () => {
    it('should create client options', async () => {
      process.env.QUEUE_USER = 'user';
      process.env.QUEUE_PASSWORD = 'password';
      process.env.QUEUE_URI = 'amqp://localhost:5672';

      when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
      when(configService.get('QUEUE_PASSWORD')).thenReturn(
        process.env.QUEUE_PASSWORD,
      );
      when(configService.get('QUEUE_URI')).thenReturn(process.env.QUEUE_URI);

      const result = await factory.createModuleConfig();

      expect(result).toEqual({
        name: 'RabbitMQ Server',
        uri: `amqp://${process.env.QUEUE_USER}:${process.env.QUEUE_PASSWORD}@localhost:5672`,
        exchanges: [
          { name: 'pagamento_aprovado', type: 'fanout' },
          { name: 'pagamento_recusado', type: 'fanout' },
        ],
        queues: [
          { name: 'pedidos_para_pagamento', options: { durable: true } },
          {
            name: 'pagamentos_aprovados',
            options: { durable: true },
            exchange: 'pagamento_aprovado',
            routingKey: '',
          },
          {
            name: 'notificacoes_pagamentos',
            options: { durable: true },
            exchange: 'pagamento_aprovado',
            routingKey: '',
          },
          {
            name: 'notificacoes_pagamentos',
            options: { durable: true },
            exchange: 'pagamento_recusado',
            routingKey: '',
          },
        ],
      });
    });

    it('should create client options false', async () => {
      process.env.QUEUE_USER = 'user';
      process.env.QUEUE_PASSWORD = 'password';
      process.env.QUEUE_HOST = 'localhost';
      process.env.QUEUE_PORT = '5672';

      when(configService.get('QUEUE_USER')).thenReturn(process.env.QUEUE_USER);
      when(configService.get('QUEUE_PASSWORD')).thenReturn(
        process.env.QUEUE_PASSWORD,
      );
      when(configService.get('QUEUE_HOST')).thenReturn(process.env.QUEUE_HOST);
      when(configService.get('QUEUE_PORT')).thenReturn(
        parseInt(process.env.QUEUE_PORT),
      );

      const result = await factory.createModuleConfig();

      expect(result).toEqual({
        name: 'RabbitMQ Server',
        uri: `amqp://${process.env.QUEUE_USER}:${process.env.QUEUE_PASSWORD}@localhost:5672`,
        exchanges: [
          { name: 'pagamento_aprovado', type: 'fanout' },
          { name: 'pagamento_recusado', type: 'fanout' },
        ],
        queues: [
          { name: 'pedidos_para_pagamento', options: { durable: true } },
          {
            name: 'pagamentos_aprovados',
            options: { durable: true },
            exchange: 'pagamento_aprovado',
            routingKey: '',
          },
          {
            name: 'notificacoes_pagamentos',
            options: { durable: true },
            exchange: 'pagamento_aprovado',
            routingKey: '',
          },
          {
            name: 'notificacoes_pagamentos',
            options: { durable: true },
            exchange: 'pagamento_recusado',
            routingKey: '',
          },
        ],
      });
    });
  });

  afterEach(() => {
    delete process.env.QUEUE_USER;
    delete process.env.QUEUE_PASSWORD;
    delete process.env.QUEUE_HOST;
    delete process.env.QUEUE_PORT;
  });
});
