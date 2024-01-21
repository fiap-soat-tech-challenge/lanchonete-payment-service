import { ApiProperty } from '@nestjs/swagger';
import { StatusPagamento } from '../../../../domain/model/status-pagamento';
import { Pagamento } from '../../../../domain/model/pagamento';

export class PagamentoStatusPresenter {
  @ApiProperty()
  readonly pagamentoId: number;

  @ApiProperty()
  readonly pedidoId: number;

  @ApiProperty()
  readonly valorTotal: number;

  @ApiProperty({ enum: StatusPagamento })
  readonly status: StatusPagamento;

  constructor(pedidoId: number, pagamento: Pagamento) {
    this.pagamentoId = pagamento.id;
    this.pedidoId = pedidoId;
    this.valorTotal = pagamento.precoTotal / 100;
    this.status = pagamento.status;
  }
}
