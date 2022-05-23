import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import application from '../src/config/app';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health-check', () => {
    it('should return succuss and application version', () => {
      expect(appController.healthCheck()).toMatchObject({
        succuss: true,
        version: application.version,
      });
    });
  });
});
