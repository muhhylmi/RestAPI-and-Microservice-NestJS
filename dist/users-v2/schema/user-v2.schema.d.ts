import { Document } from 'mongoose';
export declare type UserDocument = UserV2 & Document;
declare class Address {
    address: string;
    hobbies: [string];
    _id: false;
}
export declare const AddressSchema: import("mongoose").Schema<Document<Address, any, any>, import("mongoose").Model<Document<Address, any, any>, any, any, any>, {}>;
export declare class UserV2 {
    name: string;
    age: number;
    gender: string;
    custom: Body;
}
export declare const UserSchema: import("mongoose").Schema<Document<UserV2, any, any>, import("mongoose").Model<Document<UserV2, any, any>, any, any, any>, {}>;
export {};
