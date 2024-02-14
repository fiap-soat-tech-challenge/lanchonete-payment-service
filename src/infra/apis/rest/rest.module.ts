import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { PagamentosController } from './controllers/pagamentos.controller';
import { PagamentoService } from '../../services/pagamento.service';
import { CreatePaymentService } from './services/create-payment.service';

@Module({
  imports: [UseCasesProxyModule],
  providers: [PagamentoService, CreatePaymentService],
  controllers: [PagamentosController],
})
export class RestModule {}
