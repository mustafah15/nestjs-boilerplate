import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: ' user email ' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({ description: ' user password ' })
  password: string;
}
