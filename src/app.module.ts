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

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    BookmarksModule,
    BookmarkCategoriesModule,
    AnalysisModule,
    PrismaModule,
  ],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }],
})
export class AppModule {}
