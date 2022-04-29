import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCreateUserDto } from './dtos/auth-create-user.dto';
import { User } from './user.entity';
import * as bycrbt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: AuthCreateUserDto): Promise<void> {
    const { email, firstName, lastName, password } = createUserDto;
    const salt = await bycrbt.genSalt();
    const hashedPassword = await bycrbt.hash(password, salt);
    const user = this.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('email already exists');
      }

      throw new InternalServerErrorException();
    }
  }
}
