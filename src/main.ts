import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes - validacao DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false, //false = nao remover campos q nao estejam no DTO
      //forbidNonWhitelisted: true, //erro ao ter params alem dos declarados
    }),
  );

/*   const reflector = app.get(Reflector, 0);
  app.useGlobalGuards(new JwtAuthGuard(reflector), 0); */

 
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
