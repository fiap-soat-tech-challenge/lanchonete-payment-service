import { Pagamento } from '../model/pagamento';

export interface ProductionService {
  sendApprovedOrder(pagamento: Pagamento): Promise<void>;
}
