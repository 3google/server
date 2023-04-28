import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  // const prisma = new PrismaClient()
  // prisma.user.findUnique({
  //   where: {
  //     id:1
  //   }
  // }).then (user => {user.})
  async kakaoLogin(code: string): Promise<any> {
    const data = {
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_REST_API_KEY,
      redirect_uri: process.env.REDIRECT_URI_LOGIN,
      code,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
    };
    console.log(data);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // const {
    //   data: { access_token }, //토큰!! 이걸로 유저 정보 가져올 수 있음
    // }
    const res = await axios.post('https://kauth.kakao.com/oauth/token', data, {
      headers,
    });
    const accessToken = res.data.access_token;
    console.log(accessToken);
    const { data: userInfo } = await axios.get(
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
