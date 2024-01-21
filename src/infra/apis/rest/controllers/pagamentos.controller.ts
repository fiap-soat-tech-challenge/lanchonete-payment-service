import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { PagamentoStatusDto } from '../dtos/pagamento.status.dto';
import { PagamentoQrcodeDto } from '../dtos/pagamento.qrcode.dto';
import { UseCasesProxyModule } from '../../../usecases-proxy/use-cases-proxy.module';
import { UseCaseProxy } from '../../../usecases-proxy/use-case-proxy';
import { PagamentoQrcodePresenter } from '../presenters/pagamento.qrcode.presenter';
import { PagamentoStatusPresenter } from '../presenters/pagamento.status.presenter';
import { PaymentUseCases } from '../../../../usecases/payment.use.cases';
import { Pagamento } from '../../../../domain/model/pagamento';
import { PagamentoService } from '../../../services/pagamento.service';
import { PedidoDto } from '../dtos/pedido.dto';

@ApiTags('Pagamentos')
@ApiResponse({ status: '5XX', description: 'Erro interno do sistema' })
@ApiBearerAuth()
@Controller('/api/pagamentos')
export class PagamentosController {
  constructor(
    @Inject(UseCasesProxyModule.PAGAMENTO_USECASES_PROXY)
    private paymentUseCasesUseCaseProxy: UseCaseProxy<PaymentUseCases>,
    private pagamentoService: PagamentoService,
  ) {}

  @ApiOperation({
    summary: 'Criar novo pagamento',
    description: 'Cria um novo pagamento para um pedido realizado',
  })
  @ApiCreatedResponse({ description: 'Pagamento criado com sucesso' })
  @ApiBadRequestResponse({
    description: 'Dados inválidos ou incorretos',
  })
  @Post('novo')
  async criar(@Body() pedidoDto: PedidoDto): Promise<void> {
    console.log(pedidoDto);
    // TODO: Implementar
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
    // TODO: Implementar
    console.log(pedidoId);
    return null;
    // const pedido = await this.getPedido(pagamentoQrcodeDto.pedidoId);
    // const pagamento = await this.paymentUseCasesUseCaseProxy
    //   .getInstance()
    //   .addPagamento(new Pagamento(pedido));
    //
    // return this.pagamentoService.generateCode(pagamento);
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
    await this.paymentUseCasesUseCaseProxy
      .getInstance()
      .updateStatus(pagamentoDto.pagamentoId, pagamentoDto.status);
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
    const pedido = await this.getPedido(pedidoId);
    const pagamento = await this.paymentUseCasesUseCaseProxy
      .getInstance()
      .getPagamento(pedidoId);
    return new PagamentoStatusPresenter(pedido.id, pagamento);
  }

  private async getPedido(pedidoId: number): Promise<any> {
    console.log(pedidoId);
    return null;
    // return await this.pedidoUseCasesUseCaseProxy
    //   .getInstance()
    //   .getPedidoById(pedidoId);
  }
}
