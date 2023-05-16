import { IsEmail, IsNotEmpty } from 'class-validator';
import { Platform } from './platform.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  nickname: string;

  profileImage: string | null;

  isAdmin: boolean;

  platform: Platform;

  constructor(
    email: string,
    nickname: string,
    profileImage: string | null,
    platform: Platform,
  ) {
    this.email = email;
    this.nickname = nickname;
    this.profileImage = profileImage;
    this.platform = platform;
    this.isAdmin = false;
  }
}
