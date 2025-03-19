import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto, LoginResponseType, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    description: 'Register user',
    summary: 'Register user',
  })
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post('register')
  async register(@Body() registerData: RegisterDto) {
    return await this.authService.registerUser(registerData);
  }

  @ApiOperation({
    description: 'login user',
    summary: 'login user',
  })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    type: LoginResponseType,
    isArray: false,
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return await this.authService.login(loginData);
  }
}
