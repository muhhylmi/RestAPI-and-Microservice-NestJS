import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersV2Module } from './users-v2/users-v2.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemModule } from './item/item.module';
import * as Joi from 'joi';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from '@app/common/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RMQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        USER_QUEUE: Joi.string().required()
      }),
    }),
    UsersModule,
    UsersV2Module,
    ItemModule,
    OrderModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
