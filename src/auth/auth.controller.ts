import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Login } from './auth.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: '{access_token: string}',
  })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req, @Body() login: Login) {
    return this.authService.login(req.user);
  }
}
