import { Controller, Delete, Get, Param, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/auth/auth.guard';
import { Cookie } from 'src/utils/cookie';

@Controller('api/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly cookie: Cookie,
  ) {}

  @Get('/users')
  @UseGuards(AdminGuard)
  async findAllUsers() {
    const users = await this.adminService.getAllUsers();
    return {
      data: users,
      message: '유저 목록 조회 성공',
    };
  }

  @Delete('/users/:userId')
  @UseGuards(AdminGuard)
  async deleteUserById(
    @Param('userId') id: number,
    @Res({ passthrough: true }) res,
  ) {
    await this.adminService.deleteUser(id);
    return { message: `id가 ${id}인 회원이 정상적으로 탈퇴되었습니다.` };
  }
}
