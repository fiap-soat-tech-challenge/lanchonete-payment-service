import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { StatusPagamento } from '../../domain/model/status-pagamento';
import { ObjectId } from 'mongodb';

@Entity({ name: 'pagamentos' })
export class PagamentoEntity {
  @ObjectIdColumn()
  _id: ObjectId;

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

  get id(): ObjectId {
    return this._id;
  }

  set id(id: ObjectId) {
    this._id = id;
  }
}
