import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UsersV2Service } from './users-v2.service';
import { CreateUserV2Dto } from './dto/create-user-v2.dto';
import { UpdateUserV2Dto } from './dto/update-user-v2.dto';
import { ClientProxy, Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('usersV2')
export class UsersV2Controller {
  constructor(
    private readonly usersService: UsersV2Service,
    @Inject('USER') private readonly client: ClientProxy
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserV2Dto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<object> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Body('test') test: object) {
    let result = this.usersService.findOne(+id);
    if (id == "1") {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserV2Dto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @EventPattern('user-created')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    return this.usersService.receiveUserData(data, context);    
  }
}
