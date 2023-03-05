import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemModule } from 'src/item/item.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
    imports:[
        ConfigModule,
        ItemModule,
        MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]),
        RmqModule.register({ name: 'ORDER'})
    ],
    controllers: [OrderController],
    providers: [OrderService]
})
export class OrderModule {}
