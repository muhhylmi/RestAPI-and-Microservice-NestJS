export class CreateItemDto {
    itemName: string;
    itemCategory: string;  
    detail: object;
    createdBy: string;
    itemID: string;
}

export class response {
    data: any;
    message: string;
}

export class paginationResponse {
    data: any;
    meta: any;
    message: string
}