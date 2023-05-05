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

// 요청 데이터 형태를 변경
