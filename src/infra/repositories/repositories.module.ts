import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoEntity } from '../entities/pagamento.entity';
import { PagamentoRepositoryImpl } from './pagamento.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([PagamentoEntity])],
  exports: [PagamentoRepositoryImpl],
  providers: [PagamentoRepositoryImpl],
})
export class RepositoriesModule {}
