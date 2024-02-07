import { PagamentoQrcodeDto } from './pagamento.qrcode.dto';

describe('PagamentoQrcodeDto', () => {
  let pagamentoQrcodeDto: PagamentoQrcodeDto;

  beforeEach(() => {
    pagamentoQrcodeDto = new PagamentoQrcodeDto();
  });

  it('should create an instance', () => {
    expect(pagamentoQrcodeDto).toBeDefined();
  });

  it('should have the pedidoId property', () => {
    expect(pagamentoQrcodeDto.pedidoId).toBeUndefined();
  });
});
