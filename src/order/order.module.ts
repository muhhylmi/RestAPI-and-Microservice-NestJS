import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, itemSchema } from 'src/item/schema/item.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
    imports:[
        ConfigModule,
        MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
        MongooseModule.forFeature([{name: Item.name, schema: itemSchema}]),
        RmqModule.register({ name: 'ORDER'})
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
