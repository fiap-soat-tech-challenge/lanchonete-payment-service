import { Test, TestingModule } from '@nestjs/testing';
import { ProductionServiceImpl } from './production.service.impl';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { StatusPagamento } from '../../domain/model/status-pagamento';
import { ClientProxy } from '@nestjs/microservices';

class MockClientProxy {
  emit(pattern: string, data: any): void {
    console.log(pattern, data);
  }
}

describe('ProductionServiceImpl', () => {
  let service: ProductionServiceImpl;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionServiceImpl,
        {
          provide: 'APPROVED_PAYMENTS_QUEUE_CLIENT',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    service = module.get<ProductionServiceImpl>(ProductionServiceImpl);
    clientProxy = module.get<ClientProxy>('APPROVED_PAYMENTS_QUEUE_CLIENT');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendOrderToPayment', () => {
    it('should send order to payment queue', async () => {
      const mockPagamento = new Pagamento(
        '1',
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );

      const emitSpy = jest.spyOn(clientProxy, 'emit');

      await service.sendApprovedPayment(mockPagamento);

      expect(emitSpy).toHaveBeenCalledWith(
        'approved_payment',
        new PagamentoStatusPresenter(mockPagamento),
      );
    });
  });
});
