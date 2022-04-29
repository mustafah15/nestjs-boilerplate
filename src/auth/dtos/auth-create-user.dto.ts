import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
export class AuthCreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user first name ' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user last name ' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'user email ' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is weak',
  })
  @ApiProperty({ description: 'user password ' })
  password: string;
}
