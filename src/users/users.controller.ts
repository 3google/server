import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { AdminGuard, AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { MypageResultDto } from './dto/mypage-result.dto';
import { Cookie } from 'src/utils/cookie';
import { PostsService } from 'src/posts/posts.service';
import { UpdateImageDto } from './dto/update-image.dto';
// import { FileService } from 'src/file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
    private readonly cookie: Cookie, // private readonly fileService: FileService,
  ) {}

  @Get('/mypage')
  @UseGuards(AuthGuard)
  async findById(@Req() req: Request) {
    const user = await this.usersService.findById(req.userId);
    const myPostsCnt = await this.postsService.findPostsByUser(req.userId);
    return {
      // TODO: 충진님 댓글 조회 service 업데이트 되면 추가하기
      data: {
        nickname: user.nickname,
        profileImg: user.profileImage,
        platform: user.platform,
        myPostsCnt: myPostsCnt.length,
        // myCommentsCnt:
      },
      message: '내 정보',
    } as MypageResultDto;
  }
  @Delete('/account')
  @UseGuards(AuthGuard)
  async softDelete(@Res({ passthrough: true }) res, @Req() req: Request) {
    this.cookie.clearAuthCookies(res);

    await this.usersService.softDelete(req.userId);
    return { message: '탈퇴처리 되었습니다.' };
  }

  @Patch('/account/nickname')
  @UseGuards(AuthGuard)
  async updateNickname(
    @Body() updateNicknameDto: UpdateNicknameDto,
    @Req() req: Request,
  ) {
    return this.usersService.updateNickname(
      req.userId,
      updateNicknameDto.nickname,
    );
  }

  @Post('/account/profileImage')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Req() req: Request,
    @UploadedFile() file: Express.MulterS3.File,
  ) {
    console.log(file);
    return this.usersService.updateImage(
      req.userId,
      file ? file.location : null,
    );
  }
}
