import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { errorHandler } from 'src/middleware/errorHandler';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: number) {
    const userById = await this.usersRepository.findById(id);
    return userById;
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
    const user = await this.findById(id);
    if (user.deletedAt === null) {
      errorHandler('중복 회원 복구', '이미 복구된 회원입니다.');
    }
    const restoredUser = await this.usersRepository.restoreUser(id);
    return restoredUser;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
