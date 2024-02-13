import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { ProductionService } from '../../domain/services/production.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductionServiceImpl implements ProductionService {
  private readonly logger = new Logger(ProductionServiceImpl.name);
  constructor(
    @Inject('APPROVED_PAYMENTS_QUEUE_CLIENT')
    private readonly approvedPaymentsQueueClient: ClientProxy,
  ) {}

  async sendApprovedPayment(pagamento: Pagamento): Promise<void> {
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pagamento.pedidoId}] para a fila de produção`,
    );
    this.approvedPaymentsQueueClient.emit(
      'approved_payment',
      new PagamentoStatusPresenter(pagamento),
    );
  }
}
