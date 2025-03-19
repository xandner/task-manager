import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/shared/enums/role.enum';

export class CreatedUserType {
  @ApiProperty({})
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  role: UserRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
