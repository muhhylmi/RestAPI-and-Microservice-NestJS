import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserV2 & Document;

@Schema()
export class UserV2 {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  userID: string;

  @Prop()
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(UserV2);