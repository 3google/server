import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  UnauthorizedException,
  BadRequestException,
  Redirect,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import 'dotenv/config';

const clientId = process.env.KAKAO_REST_API_KEY;
const redirectUri = `${process.env.ADDRESS}:${process.env.PORT}/auth/login/kakao/redirect`;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/login/kakao') // 카카오버튼에 이거 axios 연결만 해주면 된다
  @Redirect(KAKAO_AUTH_URL, 301)
  kakaoLogin() {}

  @Get('/login/kakao/redirect')
  async kakaoLoginRedirect(
    @Query('code') code: string,
    @Response({ passthrough: true }) res,
  ): Promise<any> {
    console.log(code);
    try {
      if (code === null || code === undefined) {
        throw new BadRequestException(`카카오 로그인 정보가 없습니다.`);
      }
      const kakao = await this.authService.kakaoLogin(code);
      console.log(`kakaoUser : ${kakao}`);
      res.send({
        user: kakao, // 유저 정보
        Message: 'success',
      });
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException();
    }
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
