import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto,SignUpDto } from './dto/user-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() createAuthDto: LoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('signup')
  signup(@Body() createAuthDto: SignUpDto):Promise <any>{
    return this.authService.signup(createAuthDto);
  }

  @Get('current')
  currentUser() {
    return this.authService.currentUser();
  }




}
