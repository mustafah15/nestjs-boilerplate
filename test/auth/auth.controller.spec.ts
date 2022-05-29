import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { mock } from 'jest-mock-extended';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { ValidationPipe } from '@nestjs/common';

import { AuthController } from '../../src/auth/auth.controller';
import { AuthCreateUserDto } from '../../src/auth/dtos/auth-create-user.dto';
import { TypeOrmSQLITETestingModule } from '../../src/testing-utils/testing.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '../../src/config/jwt.config';

describe('AuthController', () => {
  let app: INestApplication;
  let request: supertest.SuperTest<supertest.Test>;
  const authService = mock<AuthService>();

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        AuthModule,
        ...TypeOrmSQLITETestingModule(),
        ConfigModule.forRoot({
          envFilePath: `${process.env.NODE_ENV}.env`,
          load: [jwtConfig],
        }),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  beforeEach(() => {
    request = supertest(app.getHttpServer());
  });

  describe('create new user', () => {
    it('should return success 201', () => {
      const signupRequestBody: AuthCreateUserDto = {
        firstName: 'test',
        lastName: 'user',
        email: 'test@email.com',
        password: 'test@!@#T',
      };

      return request.post('/auth/signup').send(signupRequestBody).expect(201);
    });

    it('should return invalid request', () => {
      const invalidRequestBody = {
        firstName: 'test',
        lastName: 'user',
        email: 'test@email.com',
      };

      return request.post('/auth/signup').send(invalidRequestBody).expect(400);
    });
  });
});
