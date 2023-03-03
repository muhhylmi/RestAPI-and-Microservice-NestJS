import { UsersV2Service } from './users-v2.service';
import { CreateUserV2Dto } from './dto/create-user-v2.dto';
import { UpdateUserV2Dto } from './dto/update-user-v2.dto';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
export declare class UsersV2Controller {
    private readonly usersService;
    private readonly client;
    constructor(usersService: UsersV2Service, client: ClientProxy);
    create(createUserDto: CreateUserV2Dto): Promise<import("./schema/user-v2.schema").UserV2 & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<object>;
    findOne(id: string, test: object): Promise<(import("./schema/user-v2.schema").UserV2 & import("mongoose").Document<any, any, any> & {
        _id: any;
    })[]>;
    update(id: string, updateUserDto: UpdateUserV2Dto): string;
    remove(id: string): string;
    getNotifications(data: number[], context: RmqContext): Promise<object>;
}
