import { Test, TestingModule } from '@nestjs/testing';
import { ProductionServiceImpl } from './production.service.impl';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { StatusPagamento } from '../../domain/model/status-pagamento';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

class MockAmqpConnection {
  async publish(
    exchange: string,
    routingKey: string,
    data: any,
  ): Promise<void> {
    console.log(exchange, routingKey, data);
  }
}

describe('ProductionServiceImpl', () => {
  let service: ProductionServiceImpl;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionServiceImpl,
        { provide: AmqpConnection, useClass: MockAmqpConnection },
      ],
    }).compile();

    service = module.get<ProductionServiceImpl>(ProductionServiceImpl);
    amqpConnection = module.get<AmqpConnection>(AmqpConnection);
  });

  const mockPagamento = new Pagamento(
    '1',
    123,
    100.0,
    StatusPagamento.PENDENTE,
  );

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendOrderToPayment', () => {
    it('should send order to payment queue', async () => {
      const publishSpy = jest.spyOn(amqpConnection, 'publish');

      await service.sendApprovedPayment(mockPagamento);

      expect(publishSpy).toHaveBeenCalledWith(
        'pagamento_aprovado',
        '',
        new PagamentoStatusPresenter(mockPagamento),
      );
    });
  });
});
