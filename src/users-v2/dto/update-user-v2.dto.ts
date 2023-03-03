import { PartialType } from '@nestjs/mapped-types';
import { CreateUserV2Dto } from './create-user-v2.dto';

export class UpdateUserV2Dto extends PartialType(CreateUserV2Dto) {}
