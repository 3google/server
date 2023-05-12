export interface MypageResultDto {
  statusCode: number;
  message: string;
  data: {
    nickname: string;
    profileImg: string;
    social: string;
    myPostsCnt: number;
    myCommentsCnt: number;
  };
}
