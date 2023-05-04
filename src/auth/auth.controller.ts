import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  BadRequestException,
  Redirect,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  private kakaoRedirectLoginUri: string;
  private kakaoRedirectSignupUri: string;
  private kakaoLoginUrl: string;
  private kakaoSignupUrl: string;
  private cookieSecret: string;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.kakaoRedirectLoginUri = configService.get('kakaoRedirectLoginUri');
    this.kakaoRedirectSignupUri = configService.get('kakaoRedirectSignupUri');
    this.kakaoLoginUrl = configService.get('kakaoLoginUrl');
    this.kakaoSignupUrl = configService.get('kakaoSignupUrl');
    this.cookieSecret = configService.get('cookieSecret');
  }

  @Get('/login/kakao') // 1. 클라이언트가 이 경로로 로그인 요청을 보냄
  kakaoLogin(@Res({ passthrough: true }) res: Response) {
    res.redirect(this.kakaoLoginUrl); // 2. 우리서버는 리다이렉션을 통해 카카오 로그인페이지경로로 요청을 다시하게함
    // Redirect라는 것은 그저 응답을 보내주는 것.
    // 그러나 상태코드가 300번대, Response Header의 Location에 이동할 주소를 기재함
    // 클라이언트는 해당 응답을 받고 300번대 상태코드임을 확인하고 Location에 적힌 주소로 요청을 다시 보냄
  }

  // Location: http://localhost:3009/auth/login/kakao/redirect?code=asdadasdasdasdasdas
  @Get('/login/kakao/redirect') // 3. 유저가 카카오로그인 완료시 이 경로로 와서 우리 서버 로그인을 함
  async kakaoLoginRedirect(
    @Query('code') code: string, // 카카오 로그인 성공시 건네준 인가코드를 쿼리 파라미터로 받아옴
    @Res({ passthrough: true }) res,
  ) {
    console.log(`code: ${code}`);
    try {
      if (code === null || code === undefined) {
        throw new BadRequestException(`카카오 로그인 정보가 없습니다.`);
      }
      const accessToken = await this.authService.login(code);
      res.cookie('accessToken', accessToken);
      res.json({
        Message: 'success',
      });
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException();
    }
  }
  // @Get('/signup/kakao')
  // kakaoSignup(@Res({ passthrough: true }) res: Response) {
  //   res.redirect(this.kakaoSignupUrl);
  // }

  // @Get('/signup/kakao/redirect') // 3. 유저가 카카오로그인 완료시 이 경로로 와서 우리 서버 로그인을 함
  // async kakaoSignupRedirect(
  //   @Query('code') code: string, // 카카오 로그인 성공시 건네준 인가코드를 쿼리 파라미터로 받아옴
  //   @Res({ passthrough: true }) res,
  // ) {
  //   console.log(code);
  //   try {
  //     if (code === null || code === undefined) {
  //       throw new BadRequestException(`카카오 로그인 정보가 없습니다.`);
  //     }

  //     const userId = await this.authService.signupWithKakao(code);
  //     const accessToken = this.authService.createAccessToken(userId);
  //   } catch (e) {
  //     console.log(e.message);
  //     throw new UnauthorizedException();
  //   }
  // }

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
