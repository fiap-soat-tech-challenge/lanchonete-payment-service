import { Column, Entity, ObjectIdColumn, ObjectId } from 'typeorm';
import { StatusPagamento } from '../../domain/model/status-pagamento';

@Entity({ name: 'pagamentos' })
export class PagamentoEntity {
  @ObjectIdColumn()
  id: ObjectId;

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
