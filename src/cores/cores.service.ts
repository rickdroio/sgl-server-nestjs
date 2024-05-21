import { Injectable } from '@nestjs/common';
import { CreateCoreDto } from './dto/create-core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cor } from './entities/cor.entity';
import { EntityManager, Repository } from 'typeorm';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class CoresService {

  constructor(
    @InjectRepository(Cor)    
    private readonly dataRepository: Repository<Cor>,
    private readonly entityManager: EntityManager,
    private readonly cls: ClsService
  ) {}

  async create(createCoreDto: CreateCoreDto) {
    const item = new Cor(createCoreDto);
    item.tenantId = this.cls.get('tenantId');

    return await this.entityManager.save(item);
  }  

  findAll(take: number = 50, skip: number = 0) {
    return this.dataRepository.find({
      take: take, 
      skip: skip,
      where: {tenantId: this.cls.get('tenantId')},
      order: {nome: "ASC"}
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} core`;
  }

  async update(id: number, updateCoreDto: UpdateCoreDto) {
    const item = new Cor(updateCoreDto);
    item.id = id;
    item.tenantId = this.cls.get('tenantId');

    return this.entityManager.save(item);
  }  

  remove(id: number) {
    return `This action removes a #${id} core`;
  }

  updateBatch(items: CreateCoreDto[]) {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      console.log(item);

      if (item.id && item.id > 0) {
        this.update(item.id, item);
      } else {
        this.create(item);
      }
      
    }
  }  
}
