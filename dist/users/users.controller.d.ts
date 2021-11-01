/// <reference types="mongoose" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
export declare class UsersController {
    private readonly usersService;
    private readonly client;
    constructor(usersService: UsersService, client: ClientProxy);
    create(createUserDto: CreateUserDto): Promise<import("./schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): import("mongoose").Aggregate<any[]>;
    findOne(id: string, test: object): Promise<(import("./schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
    getNotifications(data: number[], context: RmqContext): Promise<(import("./schema/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
}
