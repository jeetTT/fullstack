import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppService } from '../app.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private appService: AppService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.appService.findByEmail(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const payload = { name: user.name, email: user.email, id: user._id };
      return {
        user,
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new NotFoundException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}