import { Injectable } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { ProductionService } from '../../domain/services/production.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductionServiceImpl implements ProductionService{
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  async sendApprovedOrder(pagamento: Pagamento): Promise<void> {
    const serviceUrl = this.configService.get('PRODUCTION_SERVICE_URL');
    await this.httpClientService.post(
      `${serviceUrl}/api/orders/pedidos/novo`,
      new PagamentoStatusPresenter(pagamento),
    );
  }
}
