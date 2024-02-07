import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PedidoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O Id do pedido é obrigatório' })
  @IsNumber({}, { message: 'O Id do pedido é inválido' })
  id: number | null;

  @ApiProperty()
  @IsNumber({}, { message: 'O preço total é inválido' })
  precoTotal: number;
}
