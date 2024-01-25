import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { PagamentoRepositoryImpl } from '../repositories/pagamento.repository.impl';
import { PaymentUseCases } from '../../usecases/payment.use.cases';
import { ServicesModule } from '../services/services.module';
import { ProductionServiceImpl } from '../services/production.service.impl';

@Module({
  imports: [RepositoriesModule, ServicesModule],
})
export class UseCasesProxyModule {
  static PAGAMENTO_USECASES_PROXY = 'pagamentoUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [PagamentoRepositoryImpl, ProductionServiceImpl],
          provide: UseCasesProxyModule.PAGAMENTO_USECASES_PROXY,
          useFactory: (
            pagamentoRepository: PagamentoRepositoryImpl,
            productionService: ProductionServiceImpl,
          ) =>
            new UseCaseProxy(
              new PaymentUseCases(pagamentoRepository, productionService),
            ),
        },
      ],
      exports: [UseCasesProxyModule.PAGAMENTO_USECASES_PROXY],
    };
  }
}
