import { Injectable } from '@nestjs/common';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';
import { EntityManager, ILike, MoreThan, Repository } from 'typeorm';
import { Cidade } from './entities/cidade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class CidadesService {

  constructor(
    @InjectRepository(Cidade)    
    private readonly cidadesRepository: Repository<Cidade>,
    private readonly entityManager: EntityManager,
    private readonly cls: ClsService
  ) {}

  async create(createCidadeDto: CreateCidadeDto) {
    const item = new Cidade(createCidadeDto);
    item.tenantId = this.cls.get('tenantId');

    console.log('create', item);

    return await this.entityManager.save(item);
  }

  findAll(take: number = 50, skip: number = 0) {
    return this.cidadesRepository.find({
      take: take, 
      skip: skip,
      where: {tenantId: this.cls.get('tenantId')},
      order: {nome: "ASC"}
    });
  }

/*   findAllPagedbyId(lastId: number = 0, take: number = 50) {
    return this.cidadesRepository.find({ 
      where: {id: MoreThan(lastId)},
      take: take,
      order: {nome: "ASC"}
  });
  }   */

/*   findFiltered(filter: string) {
    return this.cidadesRepository.find({
      where: [{nome: ILike(`%${filter}%`)}, {ibge: ILike(`%${filter}%`)}],      
    })
  }   */

  async findOne(id: number) {
    return this.cidadesRepository.findOneBy({id: id, tenantId: this.cls.get('tenantId')});
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto) {
    const item = new Cidade(updateCidadeDto);
    item.id = id;
    item.tenantId = this.cls.get('tenantId');

    return this.entityManager.save(item);
  }

  remove(id: number) {
    return this.cidadesRepository.delete({id: id, tenantId: this.cls.get('tenantId')});
  }

  updateBatch(items: CreateCidadeDto[]) {
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
