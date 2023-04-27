import { Emotion, BoardType } from '@prisma/client';
export class CreatePostDto {
  author_id: number; //나중에 토큰에서 읽어오기
  title: string;
  emotion: Emotion;
  content: string;
  board_type: BoardType;
}
