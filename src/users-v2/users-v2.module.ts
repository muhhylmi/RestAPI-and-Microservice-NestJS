import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserV2, UserSchema } from './schema/user-v2.schema';
import { UsersV2Controller } from './users-v2.controller';
import { UsersV2Service } from './users-v2.service';
import { RmqModule } from '@app/common';

@Module({
    imports: [
      ConfigModule,
      MongooseModule.forFeature([{name: UserV2.name, schema: UserSchema}]),
      RmqModule
    ],
    controllers: [UsersV2Controller],
    providers: [UsersV2Service]
})
export class UsersV2Module {}
