import { Pagamento } from '../model/pagamento';

export interface NotificationService {
  sendDeclinedPaymentNotification(pagamento: Pagamento): Promise<void>;
}
