export interface NaverUserDto {
  response: {
    id: string;
    nickname: string;
    profile_image: string | undefined | null;
    email: string;
  };
}
//   id: number;
//   kakao_account: {
//     profile: { nickname: string; profile_image_url: string };
//     email: string;
//     profileImage: string | undefined | null; //union타입으로 둘 중 하나
//   };
