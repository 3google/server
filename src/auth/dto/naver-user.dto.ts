export interface NaverUserDto {
  response: {
    id: string;
    nickname: string;
    profile_image: string | undefined | null;
    email: string;
  };
}
