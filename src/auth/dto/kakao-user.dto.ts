export interface KakaoUserDto {
  id: number;
  kakao_account: {
    profile: { nickname: string; profile_image_url: string | null | undefined };
    email: string;
  };
}
