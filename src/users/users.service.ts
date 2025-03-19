import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatedUserType } from './types/user.type';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByUsername(username: string): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createUser(userInfo: RegisterDto): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: { ...userInfo },
      });
    } catch (error) {
      throw new BadRequestException(error.error);
    }
  }

  async allUsers(): Promise<CreatedUserType[]> {
    try {
      return await this.prismaService.user.findMany({
        where: {},
        select: {
          username: true,
          email: true,
          id: true,
          mobile: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
