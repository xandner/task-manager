import {
  Controller,
  Get,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { RequestedUser } from 'src/auth/types/auth.type';
import { CreatedUserType } from './types/user.type';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    description: 'get all users',
    summary: 'get all users',
  })
  @ApiOkResponse({
    type: CreatedUserType,
    isArray: true,
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @UseGuards(AuthGuard, AdminGuard)
  @Get('all')
  async getAllUsers(@Req() req: RequestedUser) {
    return await this.usersService.allUsers();
  }
}
