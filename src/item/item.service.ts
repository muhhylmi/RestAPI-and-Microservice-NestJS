import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schema/item.schema';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { CreateItemDto, paginationResponse, response } from './item.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ItemService{
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    ){}

    async createItem(createItemDto: CreateItemDto): Promise<any> {
        const ctx = 'itemService-createItem';
        createItemDto.itemID = uuid();
        const createItem = new this.itemModel(createItemDto);
        const result = await createItem.save();
        if(!result){
            Logger.error('failed to insert item', ctx);
            throw new BadRequestException('failed to insert item');
        }
        return result;
    }

    async findOne(payload: string){
        const item = await this.itemModel.findOne({ itemID: payload });
        if(item.errors){
            throw new BadRequestException('item not found');
        }
        const result: response = { data: item, message: 'Item Provided' };
        return result;
    }

    async listItem(payload: any): Promise<any> {
        const query:any = {};
        (payload.itemName) && (query.itemName = { $regex: payload.itemName });

        const data = await this.itemModel.aggregate([
            { $match: query }
        ]);
        if(!data){
            throw new BadRequestException('item not found');
        }
        const meta = {
            size: data.length
        }
        const result: paginationResponse = { data, meta, message: 'List Item Provided' };
        return result;
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