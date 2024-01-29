import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { UseCasesProxyModule } from '../../usecases-proxy/use-cases-proxy.module';
import { PagamentosController } from './controllers/pagamentos.controller';
import { PagamentoService } from '../../services/pagamento.service';

@Module({
  imports: [UseCasesProxyModule],
  providers: [PagamentoService],
  controllers: [HomeController, PagamentosController],
})
export class RestModule {}
