import { Controller, UseGuards } from '@nestjs/common'
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Request } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController{
    constructor(
        private readonly orderService: OrderService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto){
        const user = req.user;
        createOrderDto.createdBy = user.userID;
        const result = await this.orderService.createOrder(createOrderDto);
        return result;
    }
}