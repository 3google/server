import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismaService: PrismaService) {}

  //전체 회원 조회
  async findAll() {
    const allUsers = await this.prismaService.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return allUsers;
  }

  //유저 탈퇴 시키기
  async delete(id: number) {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
