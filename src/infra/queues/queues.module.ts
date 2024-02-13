import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ApprovedPaymentsClientFactory } from './approved-payments-client.factory';

@Module({
  imports: [
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: 'APPROVED_PAYMENTS_QUEUE_CLIENT',
          useClass: ApprovedPaymentsClientFactory,
        },
      ],
    }),
  ],
  exports: [ClientsModule],
})
export class QueuesModule {}
