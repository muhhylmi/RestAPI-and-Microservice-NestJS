import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: uuid()})
  userID: string;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);