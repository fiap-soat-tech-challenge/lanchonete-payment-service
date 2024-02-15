import { StatusPagamento } from '../domain/model/status-pagamento';
import { PagamentoRepository } from '../domain/repositories/pagamento.repository';
import { Pagamento } from '../domain/model/pagamento';
import { ProductionService } from '../domain/services/production.service';
import { NotFoundException } from '../domain/exceptions/not-found.exception';
import { NotificationService } from '../domain/services/notification.service';

export class PaymentUseCases {
  constructor(
    private readonly pagamentoRepository: PagamentoRepository,
    private readonly productionService: ProductionService,
    private readonly notificationService: NotificationService,
  ) {}

  async updateStatus(
    pagamentoId: string,
    status: StatusPagamento,
  ): Promise<void> {
    const pagamento =
      await this.pagamentoRepository.getPagamentoById(pagamentoId);
    if (pagamento.status !== StatusPagamento.PENDENTE) return;

    pagamento.status = status;
    await this.pagamentoRepository.updateStatus(pagamento.id, pagamento);

    switch (status) {
      case StatusPagamento.APROVADO:
        await this.productionService.sendApprovedPayment(pagamento);
        break;
      case StatusPagamento.RECUSADO:
        await this.notificationService.sendDeclinedPaymentNotification(
          pagamento,
        );
        break;
    }
  }

  async getPagamento(pedidoId: number): Promise<Pagamento> {
    const pagamento =
      await this.pagamentoRepository.getPagamentoByPedidoId(pedidoId);
    if (pagamento === null) {
      throw new NotFoundException(
        'O Id do pedido fornecido não foi encontrado',
      );
    }
    return pagamento;
  }

  async addPagamento(pagamento: Pagamento): Promise<Pagamento> {
    return await this.pagamentoRepository.savePagamento(pagamento);
  }
}
