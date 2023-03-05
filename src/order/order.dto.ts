import { IsString, IsNumber, IsArray } from 'class-validator';
import { v4 as uuid } from 'uuid';

export class CreateOrderDto {
    @IsNumber()
    totalPrice: number;

    @IsArray()
    orderItems: [{
        itemID: string,
        qty: number
    }];

    @IsString()
    orderID: string;

    @IsString()
    createdBy: string;
}