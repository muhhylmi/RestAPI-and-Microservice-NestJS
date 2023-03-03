import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserV2, UserSchema } from './schema/user-v2.schema';
import { UsersV2Controller } from './users-v2.controller';
import { UsersV2Service } from './users-v2.service';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';

@Module({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        validationSchema: Joi.object({
          RMQ_URI: Joi.string().required(),
          MONGODB_URI: Joi.string().required(),
          PORT: Joi.number().required(),
          USER_QUEUE: Joi.string().required()
        }),
      }),
      MongooseModule.forFeature([{name: UserV2.name, schema: UserSchema}]),
      RmqModule.register({ name: 'USER' })
    ],
    controllers: [UsersV2Controller],
    providers: [UsersV2Service]
})
export class UsersV2Module {}
