import { Test, TestingModule } from '@nestjs/testing';
import { ProductionServiceImpl } from './production.service.impl';
import { HttpClientService } from './http-client.service';
import { Pagamento } from '../../domain/model/pagamento';
import { PagamentoStatusPresenter } from '../apis/rest/presenters/pagamento.status.presenter';
import { ConfigService } from '@nestjs/config';
import { StatusPagamento } from '../../domain/model/status-pagamento';

jest.mock('./http-client.service');
jest.mock('@nestjs/config');

describe('ProductionServiceImpl', () => {
  let productionService: ProductionServiceImpl;
  let httpClientService: HttpClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductionServiceImpl,
        HttpClientService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://production-service-url'),
          },
        },
      ],
    }).compile();

    productionService = module.get<ProductionServiceImpl>(
      ProductionServiceImpl,
    );
    httpClientService = module.get<HttpClientService>(HttpClientService);
  });

  describe('sendApprovedOrder', () => {
    it('should send approved order to production service', async () => {
      const mockPagamento = new Pagamento(
        '1',
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );

      await productionService.sendApprovedOrder(mockPagamento);

      const expectedUrl = 'https://production-service-url/api/cozinha/pedidos/novo';
      const expectedPresenter = new PagamentoStatusPresenter(mockPagamento);

      expect(httpClientService.post).toHaveBeenCalledWith(
        expectedUrl,
        expectedPresenter,
      );
    });
  });
});
