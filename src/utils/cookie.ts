import { Injectable, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import {
  ACCESS_TOKEN_COOKIE_KEY,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_MAX_AGE,
} from './constants';
import { Token } from './token';

@Injectable()
export class Cookie {
  constructor(private readonly token: Token) {}
  setAuthCookies(userId: number, isAdmin: boolean, res: Response) {
    this.setAccessTokenCookie(userId, isAdmin, res);
    this.setRefreshTokenCookie(userId, isAdmin, res);
  }

  clearAuthCookies(res: Response) {
    res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
    res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);
  }
  setAccessTokenCookie(userId: number, isAdmin: boolean, res: Response) {
    const accessToken = this.token.createAccessToken(userId, isAdmin);
    res.cookie(ACCESS_TOKEN_COOKIE_KEY, accessToken, {
      // accessToken 쿠키에 값 token.accessToken을 저장하고, 현재시간으로부터 2시간동안 유효
      path: '/',
      // expires: new Date(Date.now() + 7200000),
      maxAge: ACCESS_TOKEN_MAX_AGE,
      signed: true,
      httpOnly: true,
    });
  }
  setRefreshTokenCookie(userId: number, isAdmin: boolean, res: Response) {
    const refreshToken = this.token.createRefreshToken(userId, isAdmin);
    res.cookie(REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      // 현재시간으로부터 2주 유효
      path: '/',
      // expires: new Date(Date.now() + 900000000),
      maxAge: REFRESH_TOKEN_MAX_AGE,
      signed: true,
      httpOnly: true,
    });
  }
}
