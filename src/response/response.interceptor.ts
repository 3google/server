import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((datas) => {
        const statusCode = res.statusCode;
        const data = datas.data; // TypeError: Cannot read properties of undefined (reading 'data')
        const message = datas.message || 'Request processed successfully';
        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}
