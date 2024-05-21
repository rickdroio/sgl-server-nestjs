import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //local funciona apenas se tiver campos "username" "password", esse campo muda a logica
    super({ usernameField: 'email' });
  }

  validate(email: string, password: string) {
    const acessToken = this.authService.authLogin(email, password);
    if (!acessToken) throw new UnauthorizedException;
    return acessToken;
  }
}