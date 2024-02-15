import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { PedidoDto } from '../dtos/pedido.dto';
import { Pagamento } from '../../../../domain/model/pagamento';
import { PaymentUseCases } from '../../../../usecases/payment.use.cases';

@Injectable()
export class CreatePaymentService {
  private readonly logger = new Logger(CreatePaymentService.name);
  constructor(private paymentUseCases: PaymentUseCases) {}
  @RabbitSubscribe({
    queue: 'pedidos_para_pagamento',
  })
  public async newPaymentHandler(pedidoDto: PedidoDto): Promise<void> {
    const pagamento = new Pagamento(pedidoDto.id, pedidoDto.precoTotal);
    this.logger.log(
      `[Novo] Criando pagamento para o pedido com Id [${pedidoDto.id}]`,
    );
    await this.paymentUseCases.addPagamento(pagamento);
  }
}
