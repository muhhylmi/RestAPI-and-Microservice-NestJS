import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type UserDocument = User & Document;

@Schema()
export class User extends AbstractDocument {
  @Prop({ require: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  userID: string;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);