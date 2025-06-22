import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBaseResponse {
  @ApiProperty({ description: 'User session token' })
  @IsNotEmpty()
  @IsString()
  accessToken: string;
}
