import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async findAllUser(): Promise<object> {
    return await this.usersService.findAllUser();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string, @Body('test') test: object) {
    let result = this.usersService.findOneUser(+id);
    if (id == "1") {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      }, HttpStatus.FORBIDDEN);
    }
    return result;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }

}
