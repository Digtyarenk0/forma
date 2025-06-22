import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'newuser@example.com',
    description: 'New user email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'myStrongPassword!',
    description: 'New user password, at least 6 characters',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
