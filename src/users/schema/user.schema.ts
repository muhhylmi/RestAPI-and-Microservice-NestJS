import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
class Address{
  @Prop()
  address: string;

  @Prop()
  hobbies: [string];

  @Prop()
  _id : false
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop({type : AddressSchema })
  custom: Body;

  @Prop()
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);