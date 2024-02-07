import { PagamentoStatusDto } from './pagamento.status.dto';
import { StatusPagamento } from '../../../../domain/model/status-pagamento';

describe('PagamentoStatusDto', () => {
  it('should create a valid PagamentoStatusDto object', () => {
    const pagamentoStatusDto = new PagamentoStatusDto();
    pagamentoStatusDto.pagamentoId = '123';
    pagamentoStatusDto.status = StatusPagamento.APROVADO;

    expect(pagamentoStatusDto).toBeDefined();
    expect(pagamentoStatusDto.pagamentoId).toEqual('123');
    expect(pagamentoStatusDto.status).toEqual('APROVADO');
  });

  it('should handle undefined values', () => {
    const pagamentoStatusDto = new PagamentoStatusDto();

    expect(pagamentoStatusDto).toBeDefined();
    expect(pagamentoStatusDto.pagamentoId).toBeUndefined();
    expect(pagamentoStatusDto.status).toBeUndefined();
  });

  it('should handle null values', () => {
    const pagamentoStatusDto = new PagamentoStatusDto();
    pagamentoStatusDto.pagamentoId = null;
    pagamentoStatusDto.status = null;

    expect(pagamentoStatusDto).toBeDefined();
    expect(pagamentoStatusDto.pagamentoId).toBeNull();
    expect(pagamentoStatusDto.status).toBeNull();
  });
});
