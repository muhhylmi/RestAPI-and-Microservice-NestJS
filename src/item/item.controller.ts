import { Controller, Logger, UseGuards } from '@nestjs/common'
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController{
    constructor(
        private readonly itemService: ItemService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createItem(@Body() payload: any){
        const result = await this.itemService.createItem(payload);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async listItem(@Query() payload: any){
        const result = await this.itemService.listItem(payload);
        return result
    }

    @EventPattern('order-created')
    async getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
        const ctx = 'consumer-order-created';
        Logger.log('consume data ...', ctx);  
        return await this.itemService.receiveOrderData(data, context);    
    }
}