import { Injectable } from '@nestjs/common';
import { ClientsModuleOptionsFactory, Transport } from '@nestjs/microservices';
import { ClientProvider } from '@nestjs/microservices/module/interfaces/clients-module.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApprovedPaymentsClientFactory
  implements ClientsModuleOptionsFactory
{
  constructor(private configService: ConfigService) {}

  createClientOptions(): Promise<ClientProvider> | ClientProvider {
    const user = this.configService.get('QUEUE_USER');
    const password = this.configService.get('QUEUE_PASSWORD');
    const host = this.configService.get('QUEUE_HOST');
    const port = this.configService.get('QUEUE_PORT');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${user}:${password}@${host}:${port}`],
        queue: 'pagamentos_aprovados',
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
