import { Injectable } from '@nestjs/common';
import { CreateFornecedoreDto } from './dto/create-fornecedore.dto';
import { UpdateFornecedoreDto } from './dto/update-fornecedore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fornecedor } from './entities/fornecedor.entity';
import { EntityManager, Repository } from 'typeorm';
import { Cidade } from 'src/cidades/entities/cidade.entity';

@Injectable()
export class FornecedoresService {

  constructor(
    @InjectRepository(Fornecedor)
    private readonly fornecedoresRepository: Repository<Fornecedor>,
    private readonly entityManager: EntityManager
  ) {}  

  async create(createFornecedoreDto: CreateFornecedoreDto) {
    const cidade = new Cidade({
      ...createFornecedoreDto.cidade
    });
    const item = new Fornecedor({
      ...createFornecedoreDto,
      cidade
    });
    return await this.entityManager.save(item);
  }

  findAll() {
    return `This action returns all fornecedores`;
  }

  findOne(id: number) {
    return this.fornecedoresRepository.findOne({
      where: {id},
      relations: {cidade: true}
    })
  }

  update(id: number, updateFornecedoreDto: UpdateFornecedoreDto) {
    return `This action updates a #${id} fornecedore`;
  }

  remove(id: number) {
    return `This action removes a #${id} fornecedore`;
  }
}
