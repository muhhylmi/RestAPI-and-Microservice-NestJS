import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schema/item.schema';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class ItemService{
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    ){}

    async createItem(payload: object): Promise<any> {
        const createItem = new this.itemModel(payload);
        const result = await createItem.save();
        if(!result){
            throw new BadRequestException('failed to insert item');
        }
        return result;
    }

    async findOne(payload: string){
        const item = await this.itemModel.findOne({ itemID: payload });
        if(item.errors){
            throw new BadRequestException('item not found');
        }
        return item;
    }

    async receiveOrderData(payload: any, context: RmqContext): Promise<any> {
        const ctx = 'itemService-receiveOrderData';
        const { orderItems } = payload;
        for(const orderItem of orderItems) {
            const item = await this.itemModel.findOne({ itemID: orderItem.itemID });
            const updateItem = await this.itemModel.updateOne({itemID: orderItem.itemID}, {
                $set:{ qty: item.qty - orderItem.qty }
            })
            if (!updateItem) {
                Logger.error('update item failed', ctx);
            }
        }

        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        const msgJson = JSON.parse(originalMsg.content);
        channel.ack(originalMsg);
        return msgJson;
    }
}