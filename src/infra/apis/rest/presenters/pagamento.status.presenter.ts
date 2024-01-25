import { ApiProperty } from '@nestjs/swagger';
import { StatusPagamento } from '../../../../domain/model/status-pagamento';
import { Pagamento } from '../../../../domain/model/pagamento';

export class PagamentoStatusPresenter {
  @ApiProperty()
  readonly pagamentoId: string;

  @ApiProperty()
  readonly pedidoId: number;

  @ApiProperty()
  readonly valorTotal: number;

  @ApiProperty({ enum: StatusPagamento })
  readonly status: StatusPagamento;

  constructor(pagamento: Pagamento) {
    this.pagamentoId = pagamento.id;
    this.pedidoId = pagamento.pedidoId;
    this.valorTotal = pagamento.precoTotal;
    this.status = pagamento.status;
  }
}
