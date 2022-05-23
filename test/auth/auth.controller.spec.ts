import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { mock } from 'jest-mock-extended';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthCreateUserDto } from '../../src/auth/dtos/auth-create-user.dto';
import { User } from '../../src/auth/user.entity';
import { TypeOrmSQLITETestingModule } from '../../src/testing-utils/testing.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../../src/config/secrets';

describe('AuthController', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;
  let controller: AuthController;
  const authService = mock<AuthService>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule, ...TypeOrmSQLITETestingModule()],
      controllers: [AuthController],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    request = supertest(app.getHttpServer());
  });

  describe('create new user', () => {
    it('should return success', () => {
      const signupRequestBody: AuthCreateUserDto = {
        firstName: 'test',
        lastName: 'user',
        email: 'test@email.com',
        password: 'test',
      };
      return request.post('auth/signup').set(signupRequestBody).expect(200);
    });
  });
});
