import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { CreateUserV2Dto } from './dto/create-user-v2.dto';
import { UpdateUserV2Dto } from './dto/update-user-v2.dto';
import { UserV2, UserDocument } from './schema/user-v2.schema';
export declare class UsersV2Service {
    private userModel;
    private readonly client;
    constructor(userModel: Model<UserDocument>, client: ClientProxy);
    create(createUserDto: CreateUserV2Dto): Promise<UserV2 & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<object>;
    findOne(data: any): Promise<(UserV2 & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    update(id: number, updateUserDto: UpdateUserV2Dto): string;
    remove(id: number): string;
    receiveUserData(data: any, context: RmqContext): Promise<object>;
}
