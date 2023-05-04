import { IsInt, IsOptional } from 'class-validator';
export class CreateRecommendDto {
  @IsInt()
  @IsOptional()
  movieId?: number;
  @IsInt()
  @IsOptional()
  musicId?: number;
  @IsInt()
  @IsOptional()
  bookId?: number;
}
