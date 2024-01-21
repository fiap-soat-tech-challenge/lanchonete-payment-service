import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O Id do pedido é obrigatório' })
  @IsNumber({}, { message: 'O Id do pedido é inválido' })
  readonly pedidoId: number;

  @ApiProperty()
  @IsDecimal({ decimal_digits: '2' }, { message: 'O preço total é inválido' })
  readonly precoTotal: number;
}
