import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { Platform } from 'src/users/dto/platform.enum';
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient()
// prisma.user.findUnique({
//   where: {
//     id:1
//   }
// }).then (user => {user.profile_image})

// signup의 인자로 code를 받고 내부에서 this.authService.fetchKakaoUser(code);
// 그러면 kakao의 user 정보가 리턴됨
// 그거로 dto를 만들고
// db에 생성요청
// 그 전에 이미 가입 여부 검증
// ------

@Injectable()
export class AuthService {
  private clientId: string;
  private kakaoRedirectLoginUri: string; //카카오 페이지에서 로그인 후 회원 정보 있을 때 이동될 우리 서버 주소
  private kakaoRedirectSignupUri: string; //카카오 페이지에서 로그인 후 회원 정보 없을 때 이동될 우리 서버 주소
  private clientSecret: string;
  private jwtSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
  ) {
    this.clientId = configService.get('kakaoRestApiKey');
    this.kakaoRedirectLoginUri = configService.get('kakaoRedirectLoginUri');
    this.kakaoRedirectSignupUri = configService.get('kakaoRedirectSignupUri');
    this.clientSecret = configService.get('kakaoClientSecret');
    this.jwtSecret = configService.get('jwtSecret');
  }
  async fetchKakaoUser(code: string, isSignupRedirectUri: boolean) {
    const redirectUri = isSignupRedirectUri
      ? this.kakaoRedirectSignupUri
      : this.kakaoRedirectLoginUri;
    const data = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      redirect_uri: redirectUri,
      code,
      client_secret: this.clientSecret,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // const {
    //   data: { access_token }, //토큰!! 이걸로 유저 정보 가져올 수 있음
    // }
    const res = await axios.post('https://kauth.kakao.com/oauth/token', data, {
      headers,
    }); //토큰 요청해서 카카오에서 토큰 받아오기
    const accessToken = res.data.access_token;
    const { data: userInfo } = await axios.get<KakaoUserDto>(
      //받아온 토큰을 사용자 정보 조회 요청할 때 사용
      'https://kapi.kakao.com/v2/user/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    return userInfo;
  }

  async signupWithKakao(code: string) {
    const {
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = await this.fetchKakaoUser(code, true);
    const createUserDto = new CreateUserDto(email, nickname, Platform.KAKAO);
    const newUser = await this.usersRepository.create(createUserDto);
    return newUser.id;
  }

  async login() {}
  //TODO: jwt token 만들기
  createAccessToken(userId: number) {
    const payload = { userId: userId };
    jwt.sign(payload, this.jwtSecret);
  }
  // create() {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
