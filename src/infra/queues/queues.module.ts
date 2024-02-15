import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ApprovedPaymentsClientFactory } from './approved-payments-client.factory';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: ApprovedPaymentsClientFactory,
    }),
    QueuesModule,
  ],
  exports: [RabbitMQModule],
})
export class QueuesModule {}
