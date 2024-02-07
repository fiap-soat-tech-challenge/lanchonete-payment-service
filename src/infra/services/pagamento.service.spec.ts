import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoService } from './pagamento.service';
import { PagamentoQrcodePresenter } from '../apis/rest/presenters/pagamento.qrcode.presenter';
import { Pagamento } from '../../domain/model/pagamento';
import { StatusPagamento } from '../../domain/model/status-pagamento';

jest.mock('node-fetch');

describe('PagamentoService', () => {
  let pagamentoService: PagamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagamentoService],
    }).compile();

    pagamentoService = module.get<PagamentoService>(PagamentoService);
  });

  describe('generateCode', () => {
    it('should generate payment QR code', async () => {
      const mockPagamento = new Pagamento(
        '1',
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );

      const mockResponse = {
        id: '789',
        qrcode: 'payment_qrcode',
        valor: 100,
      };

      jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      } as any);

      const result = await pagamentoService.generateCode(mockPagamento);

      const expectedPresenter = new PagamentoQrcodePresenter(
        mockResponse.id,
        mockResponse.qrcode,
        mockResponse.valor,
      );

      expect(result).toEqual(expectedPresenter);
      expect(global.fetch).toHaveBeenCalledWith(process.env.PAYMENT_URL, {
        method: 'POST',
        body: JSON.stringify({
          valor: mockPagamento.precoTotal,
          pedidoId: mockPagamento.pedidoId,
          pagamentoId: mockPagamento.id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    });
  });
});
