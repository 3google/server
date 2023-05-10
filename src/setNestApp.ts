import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from './response/http-exception.filter';
import cookieParser from 'cookie-parser';

export function setNestApp<T extends INestApplication>(app: T): void {
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
}
