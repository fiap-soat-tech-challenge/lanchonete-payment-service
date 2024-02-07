import { Injectable, Logger } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { ProductionService } from '../../domain/services/production.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductionServiceImpl implements ProductionService {
  private readonly logger = new Logger(ProductionServiceImpl.name);
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly configService: ConfigService,
  ) {}

  /*
    Precisa de um serviço de produção para enviar o pedido aprovado
   */
  async sendApprovedOrder(pagamento: Pagamento): Promise<void> {
    const serviceUrl = this.configService.get('PRODUCTION_SERVICE_URL');
    const url = `${serviceUrl}/api/cozinha/pedidos/novo`;
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pagamento.pedidoId}] para o serviço de produção [${serviceUrl}]`,
    );

    await this.httpClientService.post(
      url,
      new PagamentoStatusPresenter(pagamento),
    );
  }
}
