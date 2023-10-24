import { Controller, Get, Post, Body, UseGuards ,Request} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/user-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('signup')
  signup(@Body() createAuthDto: SignUpDto): Promise<any> {
    return this.authService.signup(createAuthDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current')
  getProfile(@Request() req) {
    return req.user;
}




}
