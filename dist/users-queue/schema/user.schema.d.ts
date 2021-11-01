import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
declare class Address {
    address: string;
    hobbies: [string];
    _id: false;
}
export declare const AddressSchema: import("mongoose").Schema<Document<Address, any, any>, import("mongoose").Model<Document<Address, any, any>, any, any, any>, {}>;
export declare class User {
    name: string;
    age: number;
    gender: string;
    custom: Body;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, {}>;
export {};
