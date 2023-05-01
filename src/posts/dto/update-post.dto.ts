import { Emotion } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';
export class UpdatePostDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsEnum(Emotion)
  emotion: Emotion;
}
