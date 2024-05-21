import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUserDto);
  } 

}
