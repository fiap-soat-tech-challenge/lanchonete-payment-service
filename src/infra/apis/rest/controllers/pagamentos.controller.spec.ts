import { Test, TestingModule } from '@nestjs/testing';
import { PagamentosController } from './pagamentos.controller';
import { PaymentUseCases } from '../../../../usecases/payment.use.cases';
import { PagamentoService } from '../../../services/pagamento.service';
import { PagamentoStatusDto } from '../dtos/pagamento.status.dto';
import { PagamentoQrcodePresenter } from '../presenters/pagamento.qrcode.presenter';
import { PagamentoStatusPresenter } from '../presenters/pagamento.status.presenter';
import { Pagamento } from '../../../../domain/model/pagamento';
import { StatusPagamento } from '../../../../domain/model/status-pagamento';

jest.mock('../../../services/pagamento.service');

describe('PagamentosController', () => {
  let pagamentosController: PagamentosController;
  let paymentUseCases: PaymentUseCases;
  let pagamentoService: PagamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentosController],
      providers: [
        {
          provide: PaymentUseCases,
          useValue: {
            addPagamento: jest.fn(),
            getPagamento: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
        {
          provide: PagamentoService,
          useValue: {
            generateCode: jest.fn(),
          },
        },
      ],
    }).compile();

    pagamentosController =
      module.get<PagamentosController>(PagamentosController);
    paymentUseCases = module.get<PaymentUseCases>(PaymentUseCases);
    pagamentoService = module.get<PagamentoService>(PagamentoService);
  });

  describe('pagar', () => {
    it('deve gerar um QR code para o pedidoId fornecido', async () => {
      const pedidoId = 1;
      const pagamento: Pagamento = new Pagamento(
        '123',
        pedidoId,
        100,
        StatusPagamento.PENDENTE,
      );
      const expectedQrcode = new PagamentoQrcodePresenter(
        pagamento.id,
        'mocked-qrcode',
        pagamento.precoTotal,
      );

      (paymentUseCases.getPagamento as jest.Mock).mockResolvedValue(pagamento);
      (pagamentoService.generateCode as jest.Mock).mockResolvedValue(
        expectedQrcode,
      );

      const result = await pagamentosController.pagar(pedidoId);

      expect(paymentUseCases.getPagamento).toHaveBeenCalledWith(pedidoId);
      expect(pagamentoService.generateCode).toHaveBeenCalledWith(pagamento);
      expect(result).toEqual(expectedQrcode);
    });
  });

  describe('processar', () => {
    it('deve processar o status do pagamento', async () => {
      const pagamentoDto: PagamentoStatusDto = {
        pagamentoId: '123',
        status: StatusPagamento.APROVADO,
      };

      await pagamentosController.processar(pagamentoDto);

      expect(paymentUseCases.updateStatus).toHaveBeenCalledWith(
        pagamentoDto.pagamentoId,
        pagamentoDto.status,
      );
    });
  });

  describe('status', () => {
    it('deve retornar o status do pagamento do pedido', async () => {
      const pedidoId = 1;
      const pagamento: Pagamento = new Pagamento(pedidoId, 100);
      const expectedStatus = new PagamentoStatusPresenter(pagamento);

      (paymentUseCases.getPagamento as jest.Mock).mockResolvedValue(pagamento);

      const result = await pagamentosController.status(pedidoId);

      expect(paymentUseCases.getPagamento).toHaveBeenCalledWith(pedidoId);
      expect(result).toEqual(expectedStatus);
    });
  });
});
