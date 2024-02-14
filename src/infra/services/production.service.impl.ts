import { Injectable, Logger } from '@nestjs/common';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { ProductionService } from '../../domain/services/production.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProductionServiceImpl implements ProductionService {
  private readonly logger = new Logger(ProductionServiceImpl.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendApprovedPayment(pagamento: Pagamento): Promise<void> {
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pagamento.pedidoId}] para a fila de produção`,
    );
    await this.amqpConnection.publish(
      'pagamento_aprovado',
      '',
      new PagamentoStatusPresenter(pagamento),
    );
  }

  async sendRefusedPayment(pagamento: Pagamento): Promise<void> {
    this.logger.log(
      `[Sender] Enviando pedido com Id [${pagamento.pedidoId}] para a fila de notificação de pagamentos recusados`,
    );
    await this.amqpConnection.publish(
      'pagamento_recusado',
      '',
      new PagamentoStatusPresenter(pagamento),
    );
  }
}
