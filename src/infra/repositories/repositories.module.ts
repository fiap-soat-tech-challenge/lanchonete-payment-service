import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagamentoEntity } from '../entities/pagamento.entity';
import { PagamentoRepositoryImpl } from './pagamento.repository.impl';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([PagamentoEntity])],
  providers: [PagamentoRepositoryImpl],
  exports: [PagamentoRepositoryImpl],
})
export class RepositoriesModule {}
