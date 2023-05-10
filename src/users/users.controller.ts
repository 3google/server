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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard, AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { MypageResultDto } from './dto/mypage-result.dto';
import { Cookie } from 'src/utils/cookie';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cookie: Cookie,
  ) {}

  @Get('/mypage')
  @UseGuards(AuthGuard)
  async findById(@Req() req: Request) {
    console.log(req.userId);

    const user = await this.usersService.findById(req.userId);

    return {
      // TODO: 나머지 속성
      data: {
        nickname: user.nickname,
        profileImg: user.profileImage,
        social: user.platform,
        // myPostsCnt:
        // myCommentsCnt:
      },
      message: '내 정보',
      statusCode: 200,
    } as MypageResultDto;
  }
  @Delete('/account')
  @UseGuards(AuthGuard)
  async softDelete(@Res({ passthrough: true }) res, @Req() req: Request) {
    this.cookie.clearAuthCookies(res);
    await this.usersService.softDelete(req.userId);
    return { message: '탈퇴처리 되었습니다.' };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  //TODO: restore 프론트와 상의
}
