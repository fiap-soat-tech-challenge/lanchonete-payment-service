import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PaymentUseCases } from '../../usecases/payment.use.cases';
import { PagamentoRepository } from '../../domain/repositories/pagamento.repository';
import { ProductionServiceImpl } from '../services/production.service.impl';
import { ProductionService } from '../../domain/services/production.service';
import { PagamentoRepositoryImpl } from '../repositories/pagamento.repository.impl';
import { ServicesModule } from '../services/services.module';
import { NotificationServiceImpl } from '../services/notification.service.impl';
import { NotificationService } from '../../domain/services/notification.service';

const createPaymentUseCases = (
  pagamentoRepository: PagamentoRepository,
  productionService: ProductionService,
  notificationService: NotificationService,
) => {
  return new PaymentUseCases(
    pagamentoRepository,
    productionService,
    notificationService,
  );
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: PaymentUseCases,
      useFactory: createPaymentUseCases,
      inject: [
        PagamentoRepositoryImpl,
        ProductionServiceImpl,
        NotificationServiceImpl,
      ],
    },
  ],
  exports: [PaymentUseCases],
})
export class UseCasesProxyModule {}
