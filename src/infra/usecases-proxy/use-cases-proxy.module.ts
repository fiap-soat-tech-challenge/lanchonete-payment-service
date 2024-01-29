import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PaymentUseCases } from '../../usecases/payment.use.cases';
import { PagamentoRepository } from '../../domain/repositories/pagamento.repository';
import { ProductionServiceImpl } from '../services/production.service.impl';
import { ProductionService } from '../../domain/services/production.service';
import { PagamentoRepositoryImpl } from '../repositories/pagamento.repository.impl';
import { ServicesModule } from '../services/services.module';

const createPaymentUseCases = (
  pagamentoRepository: PagamentoRepository,
  productionService: ProductionService,
) => {
  return new PaymentUseCases(pagamentoRepository, productionService);
};

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    {
      provide: PaymentUseCases,
      useFactory: createPaymentUseCases,
      inject: [PagamentoRepositoryImpl, ProductionServiceImpl],
    },
  ],
  exports: [PaymentUseCases],
})
export class UseCasesProxyModule {}
