import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 다른 모든 모듈에서 갖다 쓸 수 있음(전역 모듈)
      envFilePath: '.env', // 프로젝트 루트(package.json 위치)에 있는 .env 파일을 가져옴
      validationSchema: Joi.object({
        // .env에 있는 속성들이 잘 들어왔나, 문자열이 맞나 검사(실패 시 오류)
        HOST: Joi.string().required(),
        PORT: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        KAKAO_REST_API_KEY: Joi.string().required(),
        KAKAO_REDIRECT_LOGIN_URI: Joi.string().required(),
        NAVER_REDIRECT_LOGIN_URI: Joi.string().required(),
        KAKAO_CLIENT_SECRET: Joi.string().required(),
        NAVER_CLIENT_ID: Joi.string().required(),
        NAVER_CLIENT_SECRET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        COOKIE_SECRET: Joi.string().required(),
        NAVER_STATE: Joi.string().required(),
        AWS_BUCKET_REGION: Joi.string().required(),
        AWS_BUCKET_NAME: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
      load: [
        // 프로그램 실행 이후, .env에 있는 값들을 process.env에 넣어줌
        // 그리고 넣어준 값들을 빼서 객체로 만듦(자동완성이 되어 더 편하게 사용할 수 있음)
        () => {
          // Address = localhost:3009
          return {
            port: +process.env.PORT, // :3009
            host: process.env.HOST, // localhost
            databaseUrl: process.env.DATABASE_URL,
            kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
            kakaoRedirectLoginUri: process.env.KAKAO_REDIRECT_LOGIN_URI,
            kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,
            kakaoLoginUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_LOGIN_URI}&response_type=code`,
            naverClientId: process.env.NAVER_CLIENT_ID,
            naverRedirectLoginUri: process.env.NAVER_REDIRECT_LOGIN_URI,
            naverClientSecret: process.env.NAVER_CLIENT_SECRET,
            naverState: process.env.NAVER_STATE,
            naverLoginUrl: `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT_LOGIN_URI}&response_type=code&state=${process.env.NAVER_STATE}`,
            jwtSecret: process.env.JWT_SECRET,
            cookieSecret: process.env.COOKIE_SECRET,
            awsBucketRegion: process.env.AWS_BUCKET_REGION,
            awsBucketName: process.env.AWS_BUCKET_NAME,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
            AwsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          };
        },
      ],
    }),
  ],
})
export class KakaoModule {}
