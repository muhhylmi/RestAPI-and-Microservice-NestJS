import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('USER') private readonly client: ClientProxy
  ){}
  
  async create(createUserDto: CreateUserDto) {
    const createUser = new this.userModel(createUserDto);
    const result = await createUser.save();
    if(!result){
      throw new BadRequestException('Failed to Insert User');
    }
    this.client.emit('user-created', result);
    return result;
  }

  async findAll(): Promise<object> {
    return await this.userModel.find();
  }

  async findOne(data: any) {
    const result = this.userModel.find({'name': data.name}).exec().then(res=>{
      console.log(res);
    });    
    return this.userModel.find({_id: new Types.ObjectId()}).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
