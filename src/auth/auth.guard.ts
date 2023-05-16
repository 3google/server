import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Request } from 'express';
import { ACCESS_TOKEN_COOKIE_KEY } from 'src/utils/constants';
import { Token } from 'src/utils/token';
import { errorHandler } from 'src/middleware/errorHandler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: Token,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const accessToken = req.signedCookies[ACCESS_TOKEN_COOKIE_KEY];

    // 조작하면 signedCookie가 false로 나옴
    if (accessToken === false) {
      throw new UnauthorizedException('토큰 조작 하지 마세요');
    }

    if (accessToken === undefined) {
      throw new UnauthorizedException('로그인 하세요.');
    }

    const { userId } = this.tokenService.verifyAccessToken(accessToken);
    req.userId = userId;
    return true;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly tokenService: Token) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    const accessToken = req.signedCookies[ACCESS_TOKEN_COOKIE_KEY];

    // 조작하면 signedCookie가 false로 나옴
    if (accessToken === false) {
      throw new UnauthorizedException('토큰 조작 하지 마세요');
    }

    if (accessToken === undefined) {
      throw new UnauthorizedException('로그인 하세요.');
    }

    const { userId, isAdmin } =
      this.tokenService.verifyAccessToken(accessToken);

    // admin 아니면 안돼요
    if (!isAdmin) {
      errorHandler('관리자외 접근 불가', '관리자 권한을 가지고 있지 않습니다.');
      return false;
    }
    req.userId = userId;

    return true;
  }
}
