import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject('USERS_SERVICE') private readonly client: ClientProxy
    ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.client.emit('test1', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @MessagePattern('test1')
  getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const msgJson = JSON.parse(originalMsg.content)
    return this.usersService.findOne(msgJson.data);
    ;
    
    // channel.ack(originalMsg);
  }
}
