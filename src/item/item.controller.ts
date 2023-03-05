import { Controller } from '@nestjs/common'
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController{
    constructor(
        private readonly itemService: ItemService,
    ){}

    @Post()
    async createItem(@Body() payload: any){
        const result = await this.itemService.createItem(payload);
        return result;
    }

    @Get()
    async listItem(@Query() payload: any){
        const result = await this.itemService.listItem(payload);
        return result
    }

    @EventPattern('order-created')
    async getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {    
        return await this.itemService.receiveOrderData(data, context);    
    }
}