import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { AnalysisModule } from './analysis/analysis.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BoardsModule, UserModule, AuthModule, UsersModule, PostsModule, CommentsModule, BookmarksModule, AnalysisModule],
})
export class AppModule {}
