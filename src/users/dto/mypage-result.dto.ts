import { Platform } from '@prisma/client';

export interface MypageResultDto {
  data: {
    nickname: string;
    profileImg: string;
    platform: Platform;
    myPostsCnt: number;
    myCommentsCnt: number;
  };
  message: string;
}
