import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup') // Creates a POST /auth/signup endpoint
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  // the loging end poing 
  @Post('Login') login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}