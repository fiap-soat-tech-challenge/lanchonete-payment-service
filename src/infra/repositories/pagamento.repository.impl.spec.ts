import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoRepositoryImpl } from './pagamento.repository.impl';
import { PagamentoEntity } from '../entities/pagamento.entity';
import { PagamentoConverter } from '../shared/pagamento.converter';
import { Pagamento } from '../../domain/model/pagamento';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { StatusPagamento } from '../../domain/model/status-pagamento';

describe('PagamentoRepositoryImpl', () => {
  let pagamentoRepository: PagamentoRepositoryImpl;

  const mockPagamentoEntityRepository = {
    update: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagamentoRepositoryImpl,
        {
          provide: getRepositoryToken(PagamentoEntity),
          useValue: mockPagamentoEntityRepository,
        },
      ],
    }).compile();

    pagamentoRepository = module.get<PagamentoRepositoryImpl>(
      PagamentoRepositoryImpl,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(pagamentoRepository).toBeDefined();
  });

  describe('updateStatus', () => {
    it('should update the status of the payment', async () => {
      const mockPagamento = new Pagamento(
        '1',
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );

      await pagamentoRepository.updateStatus(mockPagamento.id, mockPagamento);

      expect(mockPagamentoEntityRepository.update).toHaveBeenCalledWith(
        mockPagamento.id,
        PagamentoConverter.toEntity(mockPagamento),
      );
    });
  });

  describe('getPagamentoByPedidoId', () => {
    it('should get payment by pedidoId', async () => {
      const mockPedidoId = 789;
      const mockPagamentoEntity: PagamentoEntity = new PagamentoEntity(
        mockPedidoId,
        100.0,
        StatusPagamento.PENDENTE,
      );
      mockPagamentoEntity.id = new ObjectId();

      mockPagamentoEntityRepository.findOneBy.mockResolvedValue(
        mockPagamentoEntity,
      );

      const result =
        await pagamentoRepository.getPagamentoByPedidoId(mockPedidoId);

      const expectedPagamento =
        PagamentoConverter.toPagamento(mockPagamentoEntity);

      expect(result).toEqual(expectedPagamento);
      expect(mockPagamentoEntityRepository.findOneBy).toHaveBeenCalledWith({
        pedidoId: mockPedidoId,
      });
    });

    it('should return null if no payment found by pedidoId', async () => {
      const mockPedidoId = 789;

      mockPagamentoEntityRepository.findOneBy.mockResolvedValue(null);

      const result =
        await pagamentoRepository.getPagamentoByPedidoId(mockPedidoId);

      expect(result).toBeNull();
      expect(mockPagamentoEntityRepository.findOneBy).toHaveBeenCalledWith({
        pedidoId: mockPedidoId,
      });
    });
  });

  describe('getPagamentoById', () => {
    it('should get payment by id', async () => {
      const mockPagamentoId = '65c2e693b394dca7223e1dee';
      const mockPagamentoEntity: PagamentoEntity = new PagamentoEntity(
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );
      mockPagamentoEntity.id = new ObjectId(mockPagamentoId);

      mockPagamentoEntityRepository.findOneBy.mockResolvedValue(
        mockPagamentoEntity,
      );

      const result =
        await pagamentoRepository.getPagamentoById(mockPagamentoId);

      const expectedPagamento =
        PagamentoConverter.toPagamento(mockPagamentoEntity);

      expect(result).toEqual(expectedPagamento);
      expect(mockPagamentoEntityRepository.findOneBy).toHaveBeenCalledWith({
        _id: new ObjectId(mockPagamentoId),
      });
    });

    it('should return null if no payment found by id', async () => {
      const mockPagamentoId = '65c2e693b394dca7223e1dee';

      mockPagamentoEntityRepository.findOneBy.mockResolvedValue(null);

      const result =
        await pagamentoRepository.getPagamentoById(mockPagamentoId);

      expect(result).toBeNull();
      expect(mockPagamentoEntityRepository.findOneBy).toHaveBeenCalledWith({
        _id: new ObjectId(mockPagamentoId),
      });
    });
  });

  describe('savePagamento', () => {
    it('should save payment if not exists for the given pedidoId', async () => {
      const mockPagamento = new Pagamento(
        null,
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );
      const mockPagamentoEntityToInsert =
        PagamentoConverter.toEntity(mockPagamento);
      mockPagamentoEntityToInsert.id = new ObjectId();

      mockPagamentoEntityRepository.findOneBy.mockResolvedValue(null);

      mockPagamentoEntityRepository.save.mockResolvedValue(
        mockPagamentoEntityToInsert,
      );

      const result = await pagamentoRepository.savePagamento(mockPagamento);

      expect(result).toEqual(
        PagamentoConverter.toPagamento(mockPagamentoEntityToInsert),
      );
    });

    it('should return existing payment if already exists for the given pedidoId', async () => {
      const mockPagamento = new Pagamento(
        null,
        123,
        100.0,
        StatusPagamento.PENDENTE,
      );

      const mockPagamentoEntity = PagamentoConverter.toEntity(mockPagamento);
      mockPagamentoEntity.id = new ObjectId();

      mockPagamentoEntityRepository.findOneBy.mockResolvedValue(
        mockPagamentoEntity,
      );

      const result = await pagamentoRepository.savePagamento(mockPagamento);

      const expectedPagamento =
        PagamentoConverter.toPagamento(mockPagamentoEntity);

      expect(result).toEqual(expectedPagamento);
      expect(mockPagamentoEntityRepository.save).not.toHaveBeenCalled();
    });
  });
});
