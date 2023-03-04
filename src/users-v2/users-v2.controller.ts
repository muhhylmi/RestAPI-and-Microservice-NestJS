import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UsersV2Service } from './users-v2.service';
import { CreateUserV2Dto, UpdateUserV2Dto } from './user-v2.dto';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller('usersV2')
export class UsersV2Controller {
  constructor(
    private readonly usersService: UsersV2Service
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
  async getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {    
    return await this.usersService.receiveUserData(data, context);    
  }
}
