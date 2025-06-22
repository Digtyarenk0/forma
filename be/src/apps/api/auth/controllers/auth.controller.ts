import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Response, Request } from 'express';

import { AuthService } from '../services/auth.service';

import { LoginBaseResponse } from '../../../../shared/infrastructure/user/dto/login.base-response';
import { LoginDto } from '../../../../shared/infrastructure/user/dto/login.dto';
import { RegisterDto } from '../../../../shared/infrastructure/user/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: LoginBaseResponse })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.register(registerDto, response);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: LoginBaseResponse })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginDto, response);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: LoginBaseResponse })
  async refreshTokens(@Req() request: Request, @Res() response: Response) {
    return this.authService.refresh(request, response);
  }
}
