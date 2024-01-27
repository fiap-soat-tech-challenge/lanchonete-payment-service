import { PaymentUseCases } from './payment.use.cases';
import { Pagamento } from '../domain/model/pagamento';
import { StatusPagamento } from '../domain/model/status-pagamento';

describe('PaymentUseCases', () => {
  let paymentUseCases: PaymentUseCases;
  let pagamentoRepositoryMock: {
    getPagamentoById: jest.Mock;
    updateStatus: jest.Mock;
    getPagamentoByPedidoId: jest.Mock;
    savePagamento: jest.Mock;
  };
  let productionServiceMock: {
    sendApprovedOrder: jest.Mock;
  };

  beforeEach(() => {
    pagamentoRepositoryMock = {
      getPagamentoById: jest.fn(),
      updateStatus: jest.fn(),
      getPagamentoByPedidoId: jest.fn(),
      savePagamento: jest.fn(),
    };
    productionServiceMock = {
      sendApprovedOrder: jest.fn(),
    };
    paymentUseCases = new PaymentUseCases(
      pagamentoRepositoryMock as any,
      productionServiceMock as any,
    );
  });

  it('should update status to approved and send order if status is pending', async () => {
    const pagamentoId = '123';
    const pedidoId = 1;
    const pagamento = new Pagamento(
      pagamentoId,
      pedidoId,
      100,
      StatusPagamento.PENDENTE,
    );

    pagamentoRepositoryMock.getPagamentoById.mockResolvedValueOnce(pagamento);

    await paymentUseCases.updateStatus(pagamentoId, StatusPagamento.APROVADO);

    expect(pagamentoRepositoryMock.getPagamentoById).toHaveBeenCalledWith(
      pagamentoId,
    );
    expect(pagamentoRepositoryMock.updateStatus).toHaveBeenCalledWith(
      pagamentoId,
      pagamento,
    );
    expect(productionServiceMock.sendApprovedOrder).toHaveBeenCalledWith(
      pagamento,
    );
  });

  it('should not update status if already approved', async () => {
    const pagamentoId = '123';
    const pedidoId = 1;
    const pagamento = new Pagamento(
      pagamentoId,
      pedidoId,
      100,
      StatusPagamento.APROVADO,
    );

    pagamentoRepositoryMock.getPagamentoById.mockResolvedValueOnce(pagamento);

    await paymentUseCases.updateStatus(pagamentoId, StatusPagamento.APROVADO);

    expect(pagamentoRepositoryMock.getPagamentoById).toHaveBeenCalledWith(
      pagamentoId,
    );
    expect(pagamentoRepositoryMock.updateStatus).not.toHaveBeenCalled();
    expect(productionServiceMock.sendApprovedOrder).not.toHaveBeenCalled();
  });

  it('should get pagamento by pedidoId', async () => {
    const pedidoId = 1;
    const pagamento = new Pagamento(
      '123',
      pedidoId,
      100,
      StatusPagamento.PENDENTE,
    );

    pagamentoRepositoryMock.getPagamentoByPedidoId.mockResolvedValueOnce(
      pagamento,
    );

    const result = await paymentUseCases.getPagamento(pedidoId);

    expect(pagamentoRepositoryMock.getPagamentoByPedidoId).toHaveBeenCalledWith(
      pedidoId,
    );
    expect(result).toEqual(pagamento);
  });

  it('should add pagamento', async () => {
    const pagamento = new Pagamento(1, 100);

    pagamentoRepositoryMock.getPagamentoByPedidoId.mockResolvedValueOnce(null);
    pagamentoRepositoryMock.savePagamento.mockResolvedValueOnce(pagamento);

    const result = await paymentUseCases.addPagamento(pagamento);

    expect(pagamentoRepositoryMock.savePagamento).toHaveBeenCalledWith(
      pagamento,
    );
    expect(result).toEqual(pagamento);
  });
});
