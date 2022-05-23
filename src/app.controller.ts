import { Controller, Get } from '@nestjs/common';
import application from './config/app';

@Controller()
export class AppController {
  @Get('/')
  healthCheck() {
    return { succuss: true, version: application.version };
  }
}
