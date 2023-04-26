import { Emotion, BoardType } from '@prisma/client';
export class CreatePostDto {
  title: string;
  emotion: Emotion;
  content: string;
  author_id: number;
  board_type: BoardType;
}
