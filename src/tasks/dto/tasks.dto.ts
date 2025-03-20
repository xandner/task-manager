import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    name: 'title',
    description: 'task title',
    example: 'test task',
  })
  @IsString()
  @MaxLength(70)
  @MinLength(5)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    name: 'description',
    description: 'task description',
    example: 'some description',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(5)
  @IsOptional()
  description: string;

  @ApiProperty({
    name: 'attachment',
    description: 'task attachment must be a link',
    example: 'https://task.attachment',
  })
  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  attachment: string;
}

export class UpdateTaskDto extends CreateTaskDto{}
