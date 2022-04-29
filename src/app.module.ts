import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './config/secrets';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get('database'));
        return {
          entities: [User],
          ...configService.get('database'),
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
