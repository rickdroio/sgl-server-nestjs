import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { UserPayload } from './models/UserPayload';

@Injectable()
export class AuthService {

  constructor (
    private readonly jwtService: JwtService, 
    private readonly usuarioService: UsuariosService
  ) {};

  async authLogin(email: string, password: string) {
    const user = await this.usuarioService.validateUser(email, password);

    if (!user) return null;

    const payload: UserPayload = {
      sub: user.id,
      tid: user.tenantId,
      email: user.email,
    }    

    return this.jwtService.sign(payload);
  }

}
