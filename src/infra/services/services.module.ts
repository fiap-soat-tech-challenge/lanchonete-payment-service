import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { HttpClientService } from './http-client.service';
import { ProductionServiceImpl } from './production.service.impl';

@Module({
  providers: [PagamentoService, HttpClientService, ProductionServiceImpl],
  exports: [PagamentoService, HttpClientService, ProductionServiceImpl],
})
export class ServicesModule {}
