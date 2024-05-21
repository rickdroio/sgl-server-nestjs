import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        database: configService.getOrThrow('DATABASE_NAME'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        entities: ['dist/**/*.entity.js'],
        autoLoadEntities: true,
        synchronize: true, //configService.getOrThrow('DATABASE_SYNC'),
        //logging: true,
      }),
      inject: [ConfigService] 
    })
  ],
})
export class DatabaseModule {}
