import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { CidadesModule } from './cidades/cidades.module';
import { FornecedoresModule } from './fornecedores/fornecedores.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ClsModule } from 'nestjs-cls';
import { CoresModule } from './cores/cores.module';
import { TamanhosModule } from './tamanhos/tamanhos.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    DatabaseModule,
    CidadesModule,
    FornecedoresModule,
    AuthModule,
    UsuariosModule,
    CoresModule,
    TamanhosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },    
  ],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}

