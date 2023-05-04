import { HttpException, HttpStatus } from '@nestjs/common';

export function errorHandler(
  error: string,
  message: string,
  statusCode: number = HttpStatus.BAD_REQUEST,
) {
  throw new HttpException(
    {
      statusCode,
      error,
      message,
    },
    statusCode,
  );
}
