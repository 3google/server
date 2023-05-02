export interface KakaoUserDto {
  id: number;
  kakao_account: {
    profile: { nickname: string };
    email: string;
  };
}
