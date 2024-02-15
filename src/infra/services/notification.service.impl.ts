import { Injectable, Logger } from '@nestjs/common';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { NotificationService } from '../../domain/services/notification.service';

@Injectable()
export class NotificationServiceImpl implements NotificationService {
  private readonly logger = new Logger(NotificationServiceImpl.name);
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async sendDeclinedPaymentNotification(pagamento: Pagamento): Promise<void> {
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
