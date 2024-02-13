import { PaymentUseCases } from './payment.use.cases';
import { PagamentoRepository } from '../domain/repositories/pagamento.repository';
import { ProductionService } from '../domain/services/production.service';
import { StatusPagamento } from '../domain/model/status-pagamento';
import { Pagamento } from '../domain/model/pagamento';
import { NotFoundException } from '../domain/exceptions/not-found.exception';

describe('PaymentUseCases', () => {
  let pagamentoRepository: jest.Mocked<PagamentoRepository>;
  let productionService: jest.Mocked<ProductionService>;
  let paymentUseCases: PaymentUseCases;

  beforeEach(async () => {
    pagamentoRepository = {
      getPagamentoById: jest.fn(),
      updateStatus: jest.fn(),
      getPagamentoByPedidoId: jest.fn(),
      savePagamento: jest.fn(),
    } as jest.Mocked<PagamentoRepository>;

    productionService = {
      sendApprovedPayment: jest.fn(),
    } as jest.Mocked<ProductionService>;

    paymentUseCases = new PaymentUseCases(
      pagamentoRepository,
      productionService,
    );
  });

  describe('updateStatus', () => {
    it('should update status of pagamento successfully', async () => {
      const mockPagamento = new Pagamento(
        '1',
        123,
        50.0,
        StatusPagamento.PENDENTE,
      );

      jest
        .spyOn(pagamentoRepository, 'getPagamentoById')
        .mockResolvedValue(mockPagamento);

      await paymentUseCases.updateStatus('1', StatusPagamento.APROVADO);

      expect(pagamentoRepository.getPagamentoById).toHaveBeenCalledWith('1');
      expect(pagamentoRepository.updateStatus).toHaveBeenCalledWith(
        '1',
        mockPagamento,
      );
      expect(productionService.sendApprovedPayment).toHaveBeenCalledWith(
        mockPagamento,
      );
    });

    it('should not update status if pagamento is already approved', async () => {
      const mockPagamento = new Pagamento(
        '1',
        123,
        50.0,
        StatusPagamento.APROVADO,
      );

      jest
        .spyOn(pagamentoRepository, 'getPagamentoById')
        .mockResolvedValue(mockPagamento);
      jest.spyOn(pagamentoRepository, 'updateStatus');
      jest.spyOn(productionService, 'sendApprovedPayment');

      await paymentUseCases.updateStatus('1', StatusPagamento.APROVADO);

      expect(pagamentoRepository.getPagamentoById).toHaveBeenCalledWith('1');
      expect(pagamentoRepository.updateStatus).not.toHaveBeenCalled();
      expect(productionService.sendApprovedPayment).not.toHaveBeenCalled();
    });
  });

  describe('getPagamento', () => {
    it('should get pagamento by pedidoId successfully', async () => {
      const mockPagamento = new Pagamento(123, 50.0);

      jest
        .spyOn(pagamentoRepository, 'getPagamentoByPedidoId')
        .mockResolvedValue(mockPagamento);

      const result = await paymentUseCases.getPagamento(123);

      expect(result).toEqual(mockPagamento);
    });

    it('should throw NotFoundException if pagamento is not found', async () => {
      jest
        .spyOn(pagamentoRepository, 'getPagamentoByPedidoId')
        .mockResolvedValue(null);

      await expect(paymentUseCases.getPagamento(123)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('addPagamento', () => {
    it('should add pagamento successfully', async () => {
      const mockPagamento = new Pagamento(123, 50.0);

      jest
        .spyOn(pagamentoRepository, 'savePagamento')
        .mockResolvedValue(mockPagamento);

      const result = await paymentUseCases.addPagamento(mockPagamento);

      expect(result).toEqual(mockPagamento);
    });
  });
});
