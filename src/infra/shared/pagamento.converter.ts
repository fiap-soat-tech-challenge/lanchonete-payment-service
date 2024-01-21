import { PagamentoEntity } from '../entities/pagamento.entity';
import { Pagamento } from '../../domain/model/pagamento';

export class PagamentoConverter {
  public static toPagamento(entity: PagamentoEntity): Pagamento {
    return new Pagamento(
      entity.id,
      entity.pedidoId,
      entity.precoTotal,
      entity.status,
    );
  }

  public static toEntity(pagamento: Pagamento): PagamentoEntity {
    return new PagamentoEntity(
      pagamento.pedidoId,
      pagamento.precoTotal,
      pagamento.status,
    );
  }
}
