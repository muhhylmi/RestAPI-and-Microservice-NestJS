import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
@Schema()
class OrderItems{
  @Prop({ required: true })
  itemID: string;

  @Prop({ required: true })
  qty: string;

  @Prop()
  _id : false
}
export const OrderItemsSchema = SchemaFactory.createForClass(OrderItems);

@Schema()
export class Order {
  @Prop({ required: true })
  orderID: string;

  @Prop({ required: true })
  totalPrice: number

  @Prop({type : [OrderItemsSchema] })
  orderItems: Body;

  @Prop({ default: new Date().toISOString() })
  createdAt: string;

  @Prop({ required: true })
  createdBy: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);