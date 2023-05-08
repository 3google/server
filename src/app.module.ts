import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { AnalysisModule } from './analysis/analysis.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response/response.interceptor';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
// Config에 추가한 환경 변수가 valid한지 확인해주는 모듈(joi)
import { ConfigService } from '@nestjs/config';
import { AdminGuard, AuthGuard } from './auth/auth.guard';
import { ADMIN_GUARD, AUTH_GUARD } from '@nestjs/core/constants';

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
        KAKAO_CLIENT_SECRET: Joi.string().required(),
        NAVER_CLIENT_ID: Joi.string().required(),
        NAVER_CLIENT_SECRET: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        COOKIE_SECRET: Joi.string().required(),
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
            kakaoRedirectSignupUri: process.env.KAKAO_REDIRECT_SIGNUP_URI,
            kakaoClientSecret: process.env.KAKAO_CLIENT_SECRET,
            kakaoLoginUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_LOGIN_URI}&response_type=code`,
            naverClientId: process.env.NAVER_CLIENT_ID,
            naverClientSecret: process.env.NAVER_CLIENT_SECRET,
            jwtSecret: process.env.JWT_SECRET,
            cookieSecret: process.env.COOKIE_SECRET,
          };
        },
      ],
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    BookmarksModule,
    AnalysisModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // {
    //   provide: AUTH_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: ADMIN_GUARD,
    //   useClass: AdminGuard,
    // },
  ],
})
export class AppModule {}
