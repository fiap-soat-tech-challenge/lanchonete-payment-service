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
    const serviceUrl = 'https://to01e3flj1.execute-api.us-east-2.amazonaws.com/api/production/pedidos/novo';
    const response = await this.httpClientService.post(
      serviceUrl,
      new PagamentoStatusPresenter(pagamento),
    );
  }
}
