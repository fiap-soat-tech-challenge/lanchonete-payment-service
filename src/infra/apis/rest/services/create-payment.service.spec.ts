import { Test, TestingModule } from '@nestjs/testing';
import { PedidoDto } from '../dtos/pedido.dto';
import { CreatePaymentService } from './create-payment.service';
import { Pagamento } from '../../../../domain/model/pagamento';
import { PaymentUseCases } from '../../../../usecases/payment.use.cases';

jest.mock('../../../../usecases/payment.use.cases');

describe('CreatePaymentService', () => {
  let createPaymentService: CreatePaymentService;
  let paymentUseCases: PaymentUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatePaymentService],
      providers: [PaymentUseCases],
    }).compile();

    createPaymentService =
      module.get<CreatePaymentService>(CreatePaymentService);
    paymentUseCases = module.get<PaymentUseCases>(PaymentUseCases);
  });

  it('should be defined', () => {
    expect(createPaymentService).toBeDefined();
  });

  describe('novo', () => {
    it('should add new pedido successfully', async () => {
      const pedidoDto = new PedidoDto();
      pedidoDto.id = 123;
      pedidoDto.precoTotal = 40.0;

      await createPaymentService.newPaymentHandler(pedidoDto);

      expect(paymentUseCases.addPagamento).toHaveBeenCalledWith(
        expect.any(Pagamento),
      );
    });
  });
});
