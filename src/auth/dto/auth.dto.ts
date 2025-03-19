import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsStrongPassword } from '../decorators/password-validator.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    name: 'email',
    description: 'user email',
    example: 'email@email.com',
  })
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({
    name: 'mobile',
    description: 'user mobile',
    example: '+989123456789',
  })
  mobile: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @IsStrongPassword()
  @ApiProperty({
    name: 'password',
    description: 'user password',
    example: 'PassW0rd',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({
    example: 'test-user',
    name: 'username',
    description: 'username',
  })
  username: string;
}

export class LoginDto {
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @IsStrongPassword()
  @ApiProperty({
    name: 'password',
    description: 'user password',
    example: 'PassW0rd',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({
    example: 'test-user',
    name: 'username',
    description: 'username',
  })
  username: string;
}

export class LoginResponseType {
  @ApiProperty({
    name: 'jwt token',
  })
  token: string;
}
