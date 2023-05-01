import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port: number = Number(process.env.PORT) || 3009;
  await app.listen(port, (): void => {
    console.log(
      `정상적으로 서버를 시작하였습니다. ${process.env.HOST}:${port}`,
    );
  });
}
bootstrap();
