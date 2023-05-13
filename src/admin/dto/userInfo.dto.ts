import { Platform } from '@prisma/client';

export interface userInfoDto {
  user: {
    id: number;
    nickname: string;
    platform: Platform;
    profileImage: string | undefined | null;
    email: string;
    createdAt: Date;
    deletedAt: Date | undefined | null;
  };
}
