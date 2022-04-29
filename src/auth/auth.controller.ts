import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateUserDto } from './dtos/auth-create-user.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: AuthCreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  login(@Body() userLoginDto: UserLoginDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(userLoginDto);
  }
}
