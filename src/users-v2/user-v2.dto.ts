import { PartialType } from '@nestjs/mapped-types';

export class CreateUserV2Dto {
    username: string;
    password: string;
}

export class UpdateUserV2Dto extends PartialType(CreateUserV2Dto) {}