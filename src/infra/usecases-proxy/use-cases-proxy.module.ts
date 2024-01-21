import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './use-case-proxy';
import { PagamentoRepositoryImpl } from '../repositories/pagamento.repository.impl';
import { PaymentUseCases } from '../../usecases/payment.use.cases';

@Module({
  imports: [RepositoriesModule],
})
export class UseCasesProxyModule {
  static PAGAMENTO_USECASES_PROXY = 'pagamentoUseCasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [PagamentoRepositoryImpl],
          provide: UseCasesProxyModule.PAGAMENTO_USECASES_PROXY,
          useFactory: (pagamentoRepository: PagamentoRepositoryImpl) =>
            new UseCaseProxy(new PaymentUseCases(pagamentoRepository)),
        },
      ],
      exports: [UseCasesProxyModule.PAGAMENTO_USECASES_PROXY],
    };
  }
}
