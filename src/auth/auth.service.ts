import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, LoginResponseType, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerInfo: RegisterDto) {
    try {
      const password = await this.hashPassword(registerInfo.password);
      return await this.usersService.createUser({
        ...registerInfo,
        password,
      });
    } catch (error) {
      throw new BadRequestException(error.error);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 5;
    return await bcrypt.hash(password, saltRounds);
  }

  private async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async login(loginData: LoginDto): Promise<LoginResponseType> {
    const user = await this.usersService.findUserByUsername(loginData.username);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (!(await this.comparePassword(loginData.password, user.password))) {
      throw new UnauthorizedException('password not match');
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };
    return {
      token: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
