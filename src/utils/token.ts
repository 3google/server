import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
} from './constants';

@Injectable()
export class Token {
  private jwtSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.jwtSecret = configService.get('jwtSecret');
  }
  createAccessToken(userId: number, isAdmin: boolean) {
    const payload = {
      userId,
      isAdmin,
      expiresAt: Date.now() + ACCESS_TOKEN_COOKIE_MAX_AGE,
    };
    const accessToken = jwt.sign(payload, this.jwtSecret);
    return accessToken;
  }

  createRefreshToken(userId: number, isAdmin: boolean) {
    const payload = {
      userId,
      isAdmin,
      expiresAt: Date.now() + REFRESH_TOKEN_COOKIE_MAX_AGE,
    };
    const refreshToken = jwt.sign(payload, this.jwtSecret);
    return refreshToken;
  }
  verifyAccessToken(accessToken: string) {
    const payload = jwt.verify(accessToken, this.jwtSecret);
    if (Date.now() > (this.createAccessToken as any).expiresAt) {
      throw new UnauthorizedException(`access토큰이 만료되었습니다.`);
    }
    return payload as Payload;
  }
  verifyRefreshToken(refreshToken: string) {
    const payload = jwt.verify(refreshToken, this.jwtSecret);
    if (Date.now() > (this.createRefreshToken as any).expiresAt) {
      throw new UnauthorizedException(`refresh토큰이 만료되었습니다.`);
    }
    return payload as Payload;
  }
}

interface Payload extends JwtPayload {
  userId: number;
  isAdmin: boolean;
}
