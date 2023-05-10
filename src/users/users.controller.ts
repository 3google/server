import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard, AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { MypageResultDto } from './dto/mypage-result.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/mypage')
  @UseGuards(AuthGuard)
  async findById(@Req() req: Request) {
    console.log(req.userId);

    const user = await this.usersService.findById(req.userId);

    return {
      // TODO: 나머지 속성
      data: {
        nickname: user.nickname,
        profileImg: user.profileImage,
      },
      message: '내 정보',
      statusCode: 200,
    } as MypageResultDto;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
