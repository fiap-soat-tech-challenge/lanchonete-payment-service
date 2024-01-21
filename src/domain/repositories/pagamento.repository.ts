import { Pagamento } from '../model/pagamento';

export interface PagamentoRepository {
  getPagamentoByPedidoId(pedidoId: number): Promise<Pagamento | null>;
  getPagamentoById(id: number): Promise<Pagamento | null>;
  updateStatus(pagamentoId: number, pagamento: Pagamento): Promise<void>;
  savePagamento(pagamento: Pagamento): Promise<Pagamento>;
}
