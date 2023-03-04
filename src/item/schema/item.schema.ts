import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuid } from 'uuid';

export type ItemDocument = Item & Document;
@Schema()
class Address{
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  weight: string;

  @Prop()
  _id : false
}
export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class Item {
  @Prop({ required: true })
  itemName: string;

  @Prop({ default: uuid() })
  itemID: string;

  @Prop({ required: true })
  itemCategory: string;

  @Prop({ required: true })
  qty: number

  @Prop({ required: true })
  price: number

  @Prop({type : AddressSchema })
  detail: Body;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;

  @Prop({ required: true })
  createdBy: string;
}

export const itemSchema = SchemaFactory.createForClass(Item);