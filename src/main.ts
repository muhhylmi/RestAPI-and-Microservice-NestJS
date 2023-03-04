import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);  
  app.connectMicroservice(rmqService.getOptions('USER'));
  app.connectMicroservice(rmqService.getOptions('ORDER'));
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();  
  await app.listen(configService.get('PORT'));  
}
bootstrap();
