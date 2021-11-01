import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  
  create(createUserDto: CreateUserDto) {
    const createCat = new this.userModel(createUserDto);
    return createCat.save();
  }

  findAll() {
    return this.userModel.aggregate([{
      '$match':{
        "_id": new Types.ObjectId("617bf1a8969aa244bd122377")
      }
    }]);
  }

  findOne(data: any) {
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
