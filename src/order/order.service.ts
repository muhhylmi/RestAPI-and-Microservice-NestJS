import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common/decorators';
import { CreateOrderDto } from './order.dto';
import { Item } from 'src/item/schema/item.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService{
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        @InjectModel(Item.name) private itemModel: Model<Item>,
        @Inject('ORDER') private client: ClientProxy
    ){}

    async createOrder(payload: CreateOrderDto): Promise<any> {
        const { orderItems } = payload;
        let totalPrice = 0;
        for (const orderItem of orderItems){
            const item = await this.itemModel.findOne({ itemID: orderItem.itemID });
            if(!item){
                throw new BadRequestException('Item Not Found');
            }
            totalPrice += orderItem.qty * item.price;
        }
        payload.totalPrice = totalPrice;
        payload.orderID = uuid();
        const createOrder = new this.orderModel(payload);
        const result = await createOrder.save();
        if(!result){
            throw new BadRequestException('failed to insert item');
        }
        this.client.emit('order-created', result);
        return result;
    }
}