import { CreateUsersQueueDto } from './dto/create-users-queue.dto';
import { UpdateUsersQueueDto } from './dto/update-users-queue.dto';
export declare class UsersQueueService {
    create(createUsersQueueDto: CreateUsersQueueDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUsersQueueDto: UpdateUsersQueueDto): string;
    remove(id: number): string;
}
