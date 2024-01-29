import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from '../repositories/repositories.module';
import { PagamentoEntity } from './pagamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagamentoEntity]), RepositoriesModule],
  exports: [TypeOrmModule],
})
export class EntitiesModule {}
