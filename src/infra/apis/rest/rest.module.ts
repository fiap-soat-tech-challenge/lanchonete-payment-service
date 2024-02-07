import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { PagamentosController } from './controllers/pagamentos.controller';
import { PagamentoService } from '../../services/pagamento.service';

@Module({
  imports: [UseCasesProxyModule],
  providers: [PagamentoService],
  controllers: [PagamentosController],
})
export class RestModule {}
