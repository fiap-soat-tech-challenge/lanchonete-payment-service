import { Test, TestingModule } from '@nestjs/testing';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { NotificationServiceImpl } from './notification.service.impl';
import { Pagamento } from '../../domain/model/pagamento';
import { StatusPagamento } from '../../domain/model/status-pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';

class MockAmqpConnection {
  async publish(
    exchange: string,
    routingKey: string,
    data: any,
  ): Promise<void> {
    console.log(exchange, routingKey, data);
  }
}

describe('NotificationServiceImpl', () => {
  let service: NotificationServiceImpl;
  let amqpConnection: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationServiceImpl,
        { provide: AmqpConnection, useClass: MockAmqpConnection },
      ],
    }).compile();

    service = module.get<NotificationServiceImpl>(NotificationServiceImpl);
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

  describe('sendDeclinedPaymentNotification', () => {
    it('should send payment to notification queue', async () => {
      const publishSpy = jest.spyOn(amqpConnection, 'publish');

      await service.sendDeclinedPaymentNotification(mockPagamento);

      expect(publishSpy).toHaveBeenCalledWith(
        'pagamento_recusado',
        '',
        new PagamentoStatusPresenter(mockPagamento),
      );
    });
  });
});
