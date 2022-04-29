import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCreateUserDto } from './dtos/auth-create-user.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRepository } from './user.repository';
import * as bycrbt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(createUserDto: AuthCreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(userLoginDto: UserLoginDto): Promise<{ accessToken: string }> {
    const { email, password } = userLoginDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bycrbt.compare(password, user.password))) {
      const payload: jwtPayload = {
        email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('invalid login info');
    }
  }
}
