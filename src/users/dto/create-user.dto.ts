import { IsEmail } from 'class-validator';
import { Platform } from './platform.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  nickname: string;

  profileImage: string | null;

  isAdmin: boolean;

  platform: Platform;

  constructor(email: string, nickname: string, platform: Platform) {
    this.email = email;
    this.nickname = nickname;
    this.platform = platform;
    this.isAdmin = false;
    this.profileImage = null;
  }
}
