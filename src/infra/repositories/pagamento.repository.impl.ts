import { PagamentoRepository } from '../../domain/repositories/pagamento.repository';
import { Pagamento } from '../../domain/model/pagamento';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagamentoEntity } from '../entities/pagamento.entity';
import { PagamentoConverter } from '../shared/pagamento.converter';
import { ObjectId } from 'mongodb';

export class PagamentoRepositoryImpl implements PagamentoRepository {
  constructor(
    @InjectRepository(PagamentoEntity)
    private readonly pagamentoEntityRepository: Repository<PagamentoEntity>,
  ) {}

  async updateStatus(pagamentoId: string, pagamento: Pagamento): Promise<void> {
    await this.pagamentoEntityRepository.update(
      pagamentoId,
      PagamentoConverter.toEntity(pagamento),
    );
  }

  async getPagamentoByPedidoId(pedidoId: number): Promise<Pagamento | null> {
    const pagamentoEntity = await this.pagamentoEntityRepository.findOneBy({
      pedidoId: pedidoId,
    });
    if (pagamentoEntity === null) return null;
    return PagamentoConverter.toPagamento(pagamentoEntity);
  }

  async getPagamentoById(id: string): Promise<Pagamento | null> {
    const pagamentoEntity = await this.pagamentoEntityRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (pagamentoEntity === null) return null;
    return PagamentoConverter.toPagamento(pagamentoEntity);
  }

  async savePagamento(pagamento: Pagamento): Promise<Pagamento> {
    const pagamentoByPedido = await this.getPagamentoByPedidoId(
      pagamento.pedidoId,
    );
    if (pagamentoByPedido) {
      return pagamentoByPedido;
    }

    const pagamentoToInsert = PagamentoConverter.toEntity(pagamento);
    const pagamentoEntity =
      await this.pagamentoEntityRepository.save(pagamentoToInsert);
    return PagamentoConverter.toPagamento(pagamentoEntity);
  }
}
