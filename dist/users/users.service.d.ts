import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): import("mongoose").Aggregate<any[]>;
    findOne(data: any): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
