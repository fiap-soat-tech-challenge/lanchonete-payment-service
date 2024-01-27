import { UseCaseProxy } from './use-case-proxy';
import { PaymentUseCases } from '../../usecases/payment.use.cases';

describe('UseCaseProxy', () => {
  describe('getInstance', () => {
    it('should return the provided use case instance', () => {
      const mockUseCase = PaymentUseCases;

      const useCaseProxy = new UseCaseProxy(mockUseCase);
      const result = useCaseProxy.getInstance();

      expect(result).toBe(mockUseCase);
    });
  });
});
