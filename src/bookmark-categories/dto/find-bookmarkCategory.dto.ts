import{
  IsString, IsInt, IsNotEmpty, IsOptional
}from 'class-validator'


export class FindBookmarkCategoryDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  id

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name : string;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  user_id: number;
}

/*
"id" integer [pk, increment]
"name" varchar(255)
"user_id" integer [not null]
"created_at" timestamp [not null]
"updated_at" timestamp
"deleted_at" timestamp
*/