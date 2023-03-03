import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = UserV2 & Document;

@Schema()
class Address {
  @Prop()
  address: string;

  @Prop()
  hobbies: [string];

  @Prop()
  _id : false
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class UserV2 {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop({type : AddressSchema})
  custom: Body;
}

export const UserSchema = SchemaFactory.createForClass(UserV2);