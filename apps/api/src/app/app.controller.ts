import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';

import { Message } from '@fullstack/api-interfaces';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) { }

  @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }

  @Post('register')
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    
    const user = await this.appService.checkEmail(email);
    if (user) {
      throw new HttpException('email already exist', HttpStatus.BAD_REQUEST);
    }
    const hash = await bcrypt.hash(password, 10);
    const generatedId = await this.appService.createUser(
      name,
      email,
      hash
    );
    return { id: generatedId };
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const response = this.authService.validateUser(email, password);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAllUsers() {
    const response = await this.appService.findAll();
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const response = await this.appService.findUser(req.user.id);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req) {
    req.logout();
    return { message: 'user logged out' };
  }

  @Post('checkEmail')
  async checkEmail(@Body('email') email: string) {
    const response = await this.appService.findByEmail(email);
    return response;
  }


  @Post('reset-password')
  async reset(
    @Body('email') email: string,
    @Body('password') password: string
  ) {
    const hash = await bcrypt.hash(password, 10);
    const response = this.appService.resetPassword(email, hash);
    return response;
  }
}
