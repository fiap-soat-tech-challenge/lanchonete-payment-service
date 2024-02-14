import { Pagamento } from '../model/pagamento';

export interface ProductionService {
  sendApprovedPayment(pagamento: Pagamento): Promise<void>;
  sendRefusedPayment(pagamento: Pagamento): Promise<void>;
}
