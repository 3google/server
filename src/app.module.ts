import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { BookmarkCategoriesModule } from './bookmark-categories/bookmarkCategories.module';
import { AnalysisModule } from './analysis/analysis.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response/response.interceptor';
import { KakaoModule } from './users/kakao.module';
// import { ADMIN_GUARD, AUTH_GUARD } from '@nestjs/core/constants';
import { AdminModule } from './admin/admin.module';
// import { FileModule } from './file/file.module';

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
    BookmarkCategoriesModule, // TODO:왜 두개?
    AdminModule,
    // FileModule,
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
