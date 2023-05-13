import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { platform } from 'os';
import { userInfoDto } from './dto/userInfo.dto';
import { UsersRepository } from 'src/users/users.repository';
import { errorHandler } from 'src/middleware/errorHandler';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  //전체 회원 조회
  async getAllUsers() {
    const userEntities = await this.adminRepository.findAll();
    const userInfoDtos = userEntities.map((userEntity) => {
      const userInfoDto: userInfoDto = {
        user: {
          id: userEntity.id,
          nickname: userEntity.nickname,
          email: userEntity.email,
          profileImage: userEntity.profileImage,
          platform: userEntity.platform,
          createdAt: userEntity.createdAt,
          deletedAt: userEntity.deletedAt,
        },
      };
      return userInfoDto;
    });
    return userInfoDtos;
  }
  //유저 탈퇴시키기
  async deleteUser(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      errorHandler('중복 탈퇴', '존재하지 않는 id입니다.');
    }
    await this.adminRepository.delete(id);
  }
}
