import { RmqModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item, itemSchema } from './schema/item.schema';

@Module({
    imports:[
        ConfigModule,
        MongooseModule.forFeature([{name: Item.name, schema: itemSchema}]),
        RmqModule
    ],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule {}
