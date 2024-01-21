import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusPagamento } from '../../domain/model/status-pagamento';

@Entity({ name: 'pagamentos' })
export class PagamentoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  pedidoId: number;

  @Column()
  precoTotal: number;

  @Column({
    type: 'enum',
    enum: StatusPagamento,
    default: StatusPagamento.PENDENTE,
  })
  status: StatusPagamento;

  constructor(pedidoId: number, precoTotal: number, status: StatusPagamento) {
    this.pedidoId = pedidoId;
    this.precoTotal = precoTotal;
    this.status = status;
  }
}
