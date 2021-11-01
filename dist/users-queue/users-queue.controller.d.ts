import { ClientProxy } from '@nestjs/microservices';
import { UsersQueueService } from './users-queue.service';
import { CreateUsersQueueDto } from './dto/create-users-queue.dto';
import { UpdateUsersQueueDto } from './dto/update-users-queue.dto';
export declare class UsersQueueController {
    private readonly usersQueueService;
    private readonly client;
    constructor(usersQueueService: UsersQueueService, client: ClientProxy);
    create(createUsersQueueDto: CreateUsersQueueDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateUsersQueueDto: UpdateUsersQueueDto): string;
    remove(id: number): string;
}
