import { Controller } from '@nestjs/common'
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController{
    constructor(
        private readonly orderService: OrderService,
    ){}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto){
        const result = await this.orderService.createOrder(createOrderDto);
        return result;
    }
}