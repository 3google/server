import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { errorHandler } from 'src/middleware/errorHandler';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: number) {
    const userById = await this.usersRepository.findById(id);
    return userById;
  }

  async updateNickname(id: number, nickname: string) {
    return this.usersRepository.updateNickname(id, nickname);
  }

  async updateImage(id: number, profileImage: string) {
    return this.usersRepository.updateImage(id, profileImage);
  }

  async softDelete(id: number) {
    const user = await this.findById(id);
    if (user.deletedAt !== null) {
      errorHandler('중복 회원 탈퇴', '이미 탈퇴처리된 회원입니다.');
    }
    const deletedUser = await this.usersRepository.softDelete(id);
    return deletedUser;
  }

  async restoreUser(id: number) {
    const user = await this.findById(id); //유저를 두 번 찾는 로직인데,,어떻게 고치지 0_0
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setMonth(today.getMonth() - 1);
    // if (user.deletedAt === null) {
    //   errorHandler('중복 회원 복구', '이미 복구된 회원입니다.');
    // }
    if (monthAgo > user.deletedAt) {
      errorHandler('탈퇴 유예 기간 만료', '이미 탈퇴된 회원입니다.');
    }
    const restoredUser = await this.usersRepository.restoreUser(id);
    return restoredUser;
  }
}
