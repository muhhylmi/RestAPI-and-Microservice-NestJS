import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneUser({ username });
    if (user) {      
      const passwordMatch = await bcrypt.compare(pass, user.password);
      if(passwordMatch){
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const userData = await this.usersService.findOneUser({ username: user.username });    
    const payload = {
        username: userData.username,
        userID: userData.userID,

    }    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}