export class CreateOrderDto {
    totalPrice: number;
    orderItems: [{
        itemID: string,
        qty: number
    }];
    createdBy: string;
}