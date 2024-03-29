import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserV2Dto, UpdateUserV2Dto } from './user-v2.dto';
import { UserV2, UserDocument } from './schema/user-v2.schema';

@Injectable()
export class UsersV2Service {

  constructor(
    @InjectModel(UserV2.name) private userModel: Model<UserDocument>,
  ){}
  
  create(createUserDto: CreateUserV2Dto) {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
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

  update(id: number, updateUserDto: UpdateUserV2Dto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async receiveUserData(data: any, context: RmqContext): Promise<object> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const msgJson = JSON.parse(originalMsg.content);    

    const createUser = new this.userModel(data).save();
    if(createUser){
      channel.ack(originalMsg);
    }
    return msgJson;
  }
}
