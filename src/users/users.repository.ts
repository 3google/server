import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // create new user
  async create({
    email,
    isAdmin,
    platform,
    nickname,
    profileImage,
  }: CreateUserDto) {
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        platform,
        isAdmin,
        nickname,
        profileImage,
      },
    });
    return newUser; //return  리턴 뭐 줄건지 말건지 생각해보기
  }

  //find user throuth email
  async findByEmail(email: string) {
    const userByEmail = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    return userByEmail;
  }

  async findById(id: number) {
    const userById = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    return userById;
  }

  async softDelete(id: number) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restoreUser(id: number) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
