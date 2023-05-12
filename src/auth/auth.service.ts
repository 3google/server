import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { Platform } from 'src/users/dto/platform.enum';
import { Token } from 'src/utils/token';
import { NaverUserDto } from './dto/naver-user.dto';
import { errorHandler } from 'src/middleware/errorHandler';
import { UsersService } from 'src/users/users.service';

// signup의 인자로 code를 받고 내부에서 this.authService.fetchKakaoUser(code);
// 그러면 kakao의 user 정보가 리턴됨
// 그거로 dto를 만들고
// db에 생성요청
// 그 전에 이미 가입 여부 검증
// ------

@Injectable()
export class AuthService {
  private kakaoClientId: string;
  private kakaoRedirectLoginUri: string; //카카오 페이지에서 로그인 후 회원 정보 있을 때 이동될 우리 서버 주소
  private kakaoClientSecret: string;
  private naverClientId: string;
  private naverRedirectLoginUri: string;
  private naverClientSecret: string;
  private naverState: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
    private readonly token: Token,
    private readonly usersService: UsersService,
  ) {
    this.kakaoClientId = configService.get('kakaoRestApiKey');
    this.kakaoRedirectLoginUri = configService.get('kakaoRedirectLoginUri');
    this.kakaoClientSecret = configService.get('kakaoClientSecret');
    this.naverClientId = configService.get('naverClientId');
    this.naverRedirectLoginUri = configService.get('naverRedirectLoginUri');
    this.naverClientSecret = configService.get('naverClientSecret');
    this.naverState = configService.get('naverState');
  }
  //카카오 유저 정보 받아오기
  async fetchKakaoUser(code: string) {
    const redirectUri = this.kakaoRedirectLoginUri;
    const data = {
      grant_type: 'authorization_code',
      client_id: this.kakaoClientId,
      redirect_uri: redirectUri,
      code,
      client_secret: this.kakaoClientSecret,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // const {
    //   data: { access_token }, //토큰!! 이걸로 유저 정보 가져올 수 있음
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
    console.log(userInfo);
    return userInfo;
  }

  //카카오로그인(디비에 정보없을 시 회원가입)
  async kakaoLogin(code: string) {
    const {
      kakao_account: {
        email,
        profile: { nickname, profile_image_url },
      },
    } = await this.fetchKakaoUser(code);
    const foundUser = await this.usersRepository.findByEmail(email);
    if (!foundUser) {
      const createUserDto = new CreateUserDto(
        email,
        nickname,
        profile_image_url,
        Platform.KAKAO,
      );
      // const { id, isAdmin } = await this.usersRepository.create(createUserDto);
      const user = await this.usersRepository.create(createUserDto);
      return user;
      // return { id, isAdmin };
    }
    if (foundUser.platform == 'NAVER') {
      errorHandler(
        '로그인 실패',
        `${foundUser.platform}로 회원가입한 유저입니다.`,
      );
    }
    if (foundUser.deletedAt !== null) {
      this.usersService.restoreUser(foundUser.id);
    }
    // const { id, isAdmin } = foundUser;
    return foundUser;
  }

  //네이버 유저 정보 가져오기
  async fetchNaverUser(code: string) {
    const data = {
      grant_type: 'authorization_code',
      client_id: this.naverClientId,
      code,
      state: this.naverState,
      client_secret: this.naverClientSecret,
    };
    console.log(this.naverClientId);
    console.log(this.naverClientSecret);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // const {
    //   data: { access_token }, //토큰!! 이걸로 유저 정보 가져올 수 있음
    // }
    const res = await axios.post('https://nid.naver.com/oauth2.0/token', data, {
      headers,
    }); //토큰 요청해서 네이버에서 토큰 받아오기.
    const accessToken = res.data.access_token;
    const { data: userInfo } = await axios.get<NaverUserDto>(
      //get<naverDto> 설정하기
      //받아온 토큰을 사용자 정보 조회 요청할 때 사용
      'https://openapi.naver.com/v1/nid/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );
    console.log(userInfo);
    return userInfo;
  }

  //네이버버로그인(디비에 정보없을 시 회원가입)
  async naverLogin(code: string) {
    const {
      response: { email, nickname, profile_image },
    } = await this.fetchNaverUser(code);
    const foundUser = await this.usersRepository.findByEmail(email);
    if (!foundUser) {
      const createUserDto = new CreateUserDto(
        email,
        nickname,
        profile_image,
        Platform.NAVER,
      );
      // const { id, isAdmin } = await this.usersRepository.create(createUserDto);
      const user = await this.usersRepository.create(createUserDto);
      return user;
      // return { id, isAdmin };
    }
    if (foundUser.platform == 'KAKAO') {
      errorHandler(
        '로그인 실패',
        `${foundUser.platform}로 회원가입한 유저입니다.`,
      );
    }
    if (foundUser.deletedAt !== null) {
      this.usersService.restoreUser(foundUser.id);
    }
    // const { id, isAdmin } = foundUser;
    return foundUser;
  }
}
