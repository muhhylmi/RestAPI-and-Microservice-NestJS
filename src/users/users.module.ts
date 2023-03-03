import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import * as Joi from 'joi';

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
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    RmqModule.register({ name: 'USER' })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
