import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { HttpClientService } from './http-client.service';
import { ProductionServiceImpl } from './production.service.impl';
import { QueuesModule } from '../queues/queues.module';
import { NotificationServiceImpl } from './notification.service.impl';

@Module({
  imports: [QueuesModule],
  providers: [
    PagamentoService,
    HttpClientService,
    ProductionServiceImpl,
    NotificationServiceImpl,
  ],
  exports: [
    PagamentoService,
    HttpClientService,
    ProductionServiceImpl,
    NotificationServiceImpl,
  ],
})
export class ServicesModule {}
