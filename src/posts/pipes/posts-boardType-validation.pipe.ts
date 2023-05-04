import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';

export class PostBoardTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
