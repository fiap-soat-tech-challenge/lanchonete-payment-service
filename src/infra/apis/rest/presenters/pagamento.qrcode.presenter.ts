import { ApiProperty } from '@nestjs/swagger';

export class PagamentoQrcodePresenter {
  @ApiProperty()
  readonly pagamentoId: number;

  @ApiProperty()
  readonly qrcode: string;

  @ApiProperty()
  readonly valor: number;

  public constructor(id: number, qrcode: string, valor: number) {
    this.pagamentoId = id;
    this.qrcode = qrcode;
    this.valor = valor / 100;
  }
}
