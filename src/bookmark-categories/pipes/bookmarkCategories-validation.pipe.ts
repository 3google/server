import { ArgumentMetadata, PipeTransform } from '@nestjs/common/interfaces';

export class BookmarkCategoryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}