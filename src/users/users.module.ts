import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    RmqModule.register({ name: 'USER' })
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository]
})
export class UsersModule {}
