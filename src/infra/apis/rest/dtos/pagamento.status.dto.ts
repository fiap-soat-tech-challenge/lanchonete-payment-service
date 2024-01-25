import { StatusPagamento } from '../../../../domain/model/status-pagamento';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PagamentoStatusDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O Id do pagamento é obrigatório' })
  @IsString({ message: 'O Id do pagamento é inválido' })
  readonly pagamentoId: string;

  @ApiProperty({
    enum: StatusPagamento,
  })
  @IsEnum(StatusPagamento, { message: 'O status do pagamento não é válido' })
  readonly status: StatusPagamento;
}
