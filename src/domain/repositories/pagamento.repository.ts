import { Pagamento } from '../model/pagamento';

export interface PagamentoRepository {
  getPagamentoByPedidoId(pedidoId: number): Promise<Pagamento | null>;
  getPagamentoById(id: string): Promise<Pagamento | null>;
  updateStatus(pagamentoId: string, pagamento: Pagamento): Promise<void>;
  savePagamento(pagamento: Pagamento): Promise<Pagamento>;
}
