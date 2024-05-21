import { Module } from '@nestjs/common';
import { CoresService } from './cores.service';
import { CoresController } from './cores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cor } from './entities/cor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cor])],
  exports: [TypeOrmModule],  
  controllers: [CoresController],
  providers: [CoresService],
})
export class CoresModule {}
