import { PedidoDto } from './pedido.dto';

describe('PedidoDto', () => {
  it('should create a valid PedidoDto object', () => {
    const pedidoDto = new PedidoDto();
    pedidoDto.id = 1;
    pedidoDto.precoTotal = 100;

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.id).toEqual(1);
    expect(pedidoDto.precoTotal).toEqual(100);
  });

  it('should handle undefined values', () => {
    const pedidoDto = new PedidoDto();

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.id).toBeUndefined();
    expect(pedidoDto.precoTotal).toBeUndefined();
  });

  it('should handle null values', () => {
    const pedidoDto = new PedidoDto();
    pedidoDto.id = null;
    pedidoDto.precoTotal = null;

    expect(pedidoDto).toBeDefined();
    expect(pedidoDto.id).toBeNull();
    expect(pedidoDto.precoTotal).toBeNull();
  });
});
