import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PagamentoStatusDto } from '../dtos/pagamento.status.dto';
import { PagamentoQrcodePresenter } from '../presenters/pagamento.qrcode.presenter';
import { PagamentoStatusPresenter } from '../presenters/pagamento.status.presenter';
import { PaymentUseCases } from '../../../../usecases/payment.use.cases';
import { Pagamento } from '../../../../domain/model/pagamento';
import { PagamentoService } from '../../../services/pagamento.service';
import { PedidoDto } from '../dtos/pedido.dto';

@ApiTags('Pagamentos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('pagamentos')
export class PagamentosController {
  private readonly logger = new Logger(PagamentosController.name);
  constructor(
    private paymentUseCases: PaymentUseCases,
    private pagamentoService: PagamentoService,
  ) {}

  @ApiExcludeEndpoint()
  @Post('novo')
  async criar(@Body() pedidoDto: PedidoDto): Promise<void> {
    const pagamento = new Pagamento(pedidoDto.id, pedidoDto.precoTotal);
    this.logger.log(
      `[Novo] Criando pagamento para o pedido com Id [${pedidoDto.id}]`,
    );
    await this.paymentUseCases.addPagamento(pagamento);
  }

  @ApiOperation({
    summary: 'Gera o QR Code de pagamento',
    description: 'Gera o QR Code de pagamento no gateway de pagamento',
  })
  @ApiOkResponse({
    type: PagamentoQrcodePresenter,
    description: 'QR Code gerado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post('qrcode/:pedidoId')
  async pagar(
    @Param('pedidoId') pedidoId: number,
  ): Promise<PagamentoQrcodePresenter> {
    const pagamento = await this.paymentUseCases.getPagamento(pedidoId);
    this.logger.log(
      `[QR Code] Gerando QR Code para pedido [${pagamento.pedidoId}] com pagamento Id [${pagamento.id}]`,
    );
    return this.pagamentoService.generateCode(pagamento);
  }

  @ApiOperation({
    summary: 'Processa um status de pagamento',
    description:
      'Processa o status de pagamento e do pedido do serviço externo',
  })
  @ApiOkResponse({
    description: 'Pagamento processado com sucesso',
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Put('processar')
  async processar(@Body() pagamentoDto: PagamentoStatusDto): Promise<void> {
    this.logger.log(
      `[Processar] Processando pagamento com Id [${pagamentoDto.pagamentoId}]`,
    );
    await this.paymentUseCases.updateStatus(
      pagamentoDto.pagamentoId,
      pagamentoDto.status,
    );
  }

  @ApiOperation({
    summary: 'Retorna o status do pagamento do pedido',
    description:
      'Retorna o status do pagamento do pedido pelo código do pedido',
  })
  @ApiOkResponse({
    type: PagamentoStatusPresenter,
  })
  @ApiNotFoundResponse({
    description: 'Id do pedido não existe!',
  })
  @Get('status/:pedidoId')
  async status(
    @Param('pedidoId') pedidoId: number,
  ): Promise<PagamentoStatusPresenter> {
    const pagamento = await this.paymentUseCases.getPagamento(pedidoId);
    return new PagamentoStatusPresenter(pagamento);
  }
}
