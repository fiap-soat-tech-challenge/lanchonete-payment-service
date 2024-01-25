import { Injectable } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { Pagamento } from '../../domain/model/pagamento';
import { EnvironmentService } from '../config/environment/environment.service';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { ProductionService } from '../../domain/services/production.service';

@Injectable()
export class ProductionServiceImpl implements ProductionService{
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly envie: EnvironmentService,
  ) {}

  async sendApprovedOrder(pagamento: Pagamento): Promise<void> {
    await this.httpClientService.post(
      `${this.envie.getProductionServiceUrl()}/api/pedidos/novo`,
      new PagamentoStatusPresenter(pagamento),
    );
  }
}
