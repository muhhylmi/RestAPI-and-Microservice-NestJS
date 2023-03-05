import { Inject, Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  protected readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly userRepository: UserRepository,
    @Inject('USER') private readonly client: ClientProxy
  ){}
  
  async createUser(createUserDto: CreateUserDto) {
    const checkUser = await this.userRepository.findOne({ username: createUserDto.username });
    if(checkUser){
      this.logger.error('User Already Exists');
      throw new BadRequestException('User Already Exists');
    }
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    createUserDto.userID = uuid();
    const result = this.userRepository.create(createUserDto, {});
    if(!result){
      this.logger.error('Failed to Insert User');
      throw new BadRequestException('Failed to Insert User');
    }
    this.client.emit('user-created', result);
    return result;
  }

  async findAllUser(): Promise<object> {
    return await this.userRepository.find({});
  }

  async findOneUser(query: any) {
    const result = await this.userRepository.findOne(query)
    if(!result){
      throw new BadRequestException('failed to get user');
    }
    return result;  }


  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.findOneAndUpdate({ userID: id}, {
      $set: updateUserDto
    })
    return result;
  }

  async removeUser(id: string) {
    return await this.userRepository.deleteOne({ userID: id });
  }
}
