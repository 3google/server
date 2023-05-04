import{IsString, IsInt, IsNotEmpty, IsOptional}from 'class-validator'

export class UpdateBookmarkCategoryDto {

  @IsString()
  name: string;
}