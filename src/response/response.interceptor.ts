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
        const data = datas.data;
        const message = datas.message || 'Request processed successfully';
        if (!data) {
          return {
            statusCode,
            message,
          };
        }
        return {
          statusCode,
          message,
          data,
        };
      }),
    );
  }
}
