import { PagamentoEntity } from '../entities/pagamento.entity';
import { StatusPagamento } from '../../domain/model/status-pagamento';
import { PagamentoConverter } from './pagamento.converter';
import { Pagamento } from '../../domain/model/pagamento';
import { ObjectId } from 'mongodb';

describe('PagamentoConverter', () => {
  it('should convert PagamentoEntity to Pagamento', () => {
    const id = new ObjectId();
    const entity = new PagamentoEntity(1, 100, StatusPagamento.APROVADO);
    entity.id = id;

    const pagamento = PagamentoConverter.toPagamento(entity);

    expect(pagamento.id).toBe(id.toString());
    expect(pagamento.pedidoId).toBe(1);
    expect(pagamento.precoTotal).toBe(100);
    expect(pagamento.status).toBe(StatusPagamento.APROVADO);
  });

  it('should convert Pagamento to PagamentoEntity', () => {
    const pagamento = new Pagamento(1, 100);

    const entity = PagamentoConverter.toEntity(pagamento);

    expect(entity.pedidoId).toBe(1);
    expect(entity.precoTotal).toBe(100);
    expect(entity.status).toBe(StatusPagamento.PENDENTE);
  });
});
