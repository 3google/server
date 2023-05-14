import {
  Controller,
  Get,
  Post,
  UnauthorizedException,
  BadRequestException,
  Redirect,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { Cookie } from 'src/utils/cookie';
import { errorHandler } from 'src/middleware/errorHandler';

@Controller('auth')
export class AuthController {
  private kakaoRedirectLoginUri: string;
  private kakaoLoginUrl: string;
  private naverRedirectLoginUri: string;
  private naverLoginUrl: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly cookie: Cookie,
  ) {
    this.kakaoRedirectLoginUri = configService.get('kakaoRedirectLoginUri');
    this.kakaoLoginUrl = configService.get('kakaoLoginUrl');
    this.naverRedirectLoginUri = configService.get('naverRedirectLoginUri');
    this.naverLoginUrl = configService.get('naverLoginUrl');
  }

  @Get('/login/kakao') // 1. 클라이언트가 이 경로로 로그인 요청을 보냄
  kakaoLogin(@Res({ passthrough: true }) res: Response) {
    res.redirect(this.kakaoLoginUrl); // 2. 우리서버는 리다이렉션을 통해 카카오 로그인페이지경로로 요청을 다시하게함
    // Redirect라는 것은 그저 응답을 보내주는 것.
    // 그러나 상태코드가 300번대, Response Header의 Location에 이동할 주소를 기재함
    // 클라이언트는 해당 응답을 받고 300번대 상태코드임을 확인하고 Location에 적힌 주소로 요청을 다시 보냄
    // @Redirect("https://changhoi.github.io", 301)
    // @HttpCode(204)
  }

  // Location: http://localhost:3009/auth/login/kakao/redirect?code=asdadasdasdasdasdas
  @Get('/login/kakao/redirect') // 3. 유저가 카카오로그인 완료시 이 경로로 와서 우리 서버 로그인을 함
  async kakaoLoginRedirect(
    @Query('code') code: string, // 카카오 로그인 성공시 건네준 인가코드를 쿼리 파라미터로 받아옴
    @Res({ passthrough: true }) res,
  ) {
    // console.log(`code: ${code}`);
    const user = await this.authService.kakaoLogin(code);
    this.cookie.setAuthCookies(user.id, user.isAdmin, res);
    // res.redirect('http://localhost:3000/'); //! 나중에 주석(redirect) 풀기
    return { message: '로그인에 성공했습니다.' };
  }

  @Get('/login/naver')
  naverLogin(@Res({ passthrough: true }) res: Response) {
    res.redirect(this.naverLoginUrl);
  }

  @Get('/login/naver/redirect')
  async naverLoginRedirect(
    @Query('code') code: string,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.naverLogin(code);
    this.cookie.setAuthCookies(user.id, user.isAdmin, res);
    // res.redirect('http://localhost:3000/'); //! 나중에 주석(redirect) 풀기
    return { message: '로그인에 성공했습니다.' };
  }

  //로그아웃
  @Post('/logout')
  logout(@Res({ passthrough: true }) res) {
    this.cookie.clearAuthCookies(res);
    return { message: '로그아웃 되셨습니다.' };
  }
}
