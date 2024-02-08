import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoService } from './pagamento.service';
import { HttpClientService } from './http-client.service';
import { ProductionServiceImpl } from './production.service.impl';
import { ServicesModule } from './services.module';

jest.mock('./http-client.service');
jest.mock('./production.service.impl');

describe('ServicesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ServicesModule],
      providers: [PagamentoService, HttpClientService, ProductionServiceImpl],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide PagamentoService', () => {
    const service = module.get<PagamentoService>(PagamentoService);
    expect(service).toBeDefined();
  });

  it('should provide HttpClientService', () => {
    const service = module.get<HttpClientService>(HttpClientService);
    expect(service).toBeDefined();
  });

  it('should provide ProductionServiceImpl', () => {
    const service = module.get<ProductionServiceImpl>(ProductionServiceImpl);
    expect(service).toBeDefined();
  });

  it('should export PagamentoService', () => {
    const exportedService = module.get<PagamentoService>(PagamentoService);
    expect(exportedService).toBeDefined();
  });

  it('should export HttpClientService', () => {
    const exportedService = module.get<HttpClientService>(HttpClientService);
    expect(exportedService).toBeDefined();
  });

  it('should export ProductionServiceImpl', () => {
    const exportedService = module.get<ProductionServiceImpl>(
      ProductionServiceImpl,
    );
    expect(exportedService).toBeDefined();
  });
});
