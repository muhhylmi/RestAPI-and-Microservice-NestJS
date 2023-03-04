import { Controller } from '@nestjs/common'
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateItemDto } from './item.dto';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController{
    constructor(
        private readonly itemService: ItemService,
    ){}

    @Post()
    async createItem(@Body() createItemDto: CreateItemDto){
        const result = await this.itemService.createItem(createItemDto);
        return result;
    }

    @EventPattern('order-created')
    async getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {    
        return await this.itemService.receiveOrderData(data, context);    
    }
}