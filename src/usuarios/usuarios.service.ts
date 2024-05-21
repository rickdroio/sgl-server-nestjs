import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    private readonly entityManager: EntityManager
  ) {}    

  findByEmail(email: string) {
    return this.usuarioRepository.findOne({
      where: {email: email}
    })
  }

  async create(createUsuarioDto: CreateUsuarioDto) {
    
    const usuario = new Usuario({
      email: createUsuarioDto.email,
      nome: createUsuarioDto.nome,
      tenantId: createUsuarioDto.tenantId,
      password: await bcrypt.hash(createUsuarioDto.password, 10)
    })
    
    const createdUser = await this.entityManager.save(usuario);

    return {
      ...createdUser,
      password: undefined
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) return null;

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password, 0);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }
  }



}
