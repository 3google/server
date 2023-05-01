import { IsInt, IsOptional } from 'class-validator';
export class CreateRecommendDto {
  @IsInt()
  @IsOptional()
  movie_id?: number;
  @IsInt()
  @IsOptional()
  music_id?: number;
  @IsInt()
  @IsOptional()
  book_id?: number;
}
