import { StatusPagamento } from './status-pagamento';

export class Pagamento {
  private readonly _id: string | null;
  private readonly _pedidoId: number;
  private readonly _precoTotal: number;
  private _status: StatusPagamento;

  constructor(pedidoId: number, precoTotal: number);

  constructor(
    id: string,
    pedidoId: number,
    precoTotal: number,
    status: StatusPagamento,
  );

  public constructor(...params: any[]) {
    if (params.length === 2) {
      this._pedidoId = params[0];
      this._precoTotal = params[1];
      this._status = StatusPagamento.PENDENTE;
      return;
    }
    this._id = params[0];
    this._pedidoId = params[1];
    this._precoTotal = params[2];
    this._status = params[3];
  }

  get id(): string | null {
    return this._id;
  }

  get pedidoId(): number {
    return this._pedidoId;
  }

  get precoTotal(): number {
    return this._precoTotal;
  }

  get status(): StatusPagamento {
    return this._status;
  }

  set status(value: StatusPagamento) {
    this._status = value;
  }
}
