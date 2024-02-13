import { Pagamento } from '../model/pagamento';

export interface ProductionService {
  sendApprovedPayment(pagamento: Pagamento): Promise<void>;
}
