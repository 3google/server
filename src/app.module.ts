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
import { KakaoModule } from './users/kakao.module';
import { BookmarkCategoriesModule } from './bookmark-categories/bookmarkCategories.module';
// Config에 추가한 환경 변수가 valid한지 확인해주는 모듈(joi)

@Module({
  imports: [
    KakaoModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    BookmarksModule,
    BookmarkCategoriesModule,
    AnalysisModule,
    PrismaModule,
    BookmarkCategoriesModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
