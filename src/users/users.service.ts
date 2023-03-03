import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('USER') private readonly client: ClientProxy
  ){}
  
  create(createUserDto: CreateUserDto) {
    const createCat = new this.userModel(createUserDto);
    this.client.emit('user-created', createUserDto);
    return createCat.save();
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
