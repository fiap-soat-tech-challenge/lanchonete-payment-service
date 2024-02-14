import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';

export const configureQueueConsumers = async (
  app: INestApplication,
): Promise<void> => {
  const configService = app.get(ConfigService);

  const user = configService.get('QUEUE_USER');
  const password = configService.get('QUEUE_PASSWORD');
  const host = configService.get('QUEUE_HOST');
  const port = configService.get('QUEUE_PORT');

  const queues = ['pedidos_para_pagamento'];

  for (const queue of queues) {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}:${port}`],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    });
  }
};
