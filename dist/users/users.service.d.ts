import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
export declare class UsersService {
    private userModel;
    private readonly client;
    constructor(userModel: Model<UserDocument>, client: ClientProxy);
    create(createUserDto: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<object>;
    findOne(data: any): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    receiveUserData(data: any, context: RmqContext): Promise<object>;
}
