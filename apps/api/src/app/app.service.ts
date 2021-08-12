import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '@fullstack/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class AppService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  getData(): Message {
    return { message: 'Welcome to api!' };
  }

  async createUser(name: string, email: string, password: string) {
    const newUser = new this.userModel({
      name,
      email,
      password
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getAllUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  async findByEmail(email: string): Promise<User> {
    let user: any;

    try {
      user = await this.userModel.findOne({ email: email });
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async checkEmail(email: string): Promise<User> {
    let user: any;

    try {
      user = await this.userModel.findOne({ email: email });

    } catch (error) {
      return user = null;
    }
    if (!user) {
      return user = null;
    }
    return user;
  }

  async resetPassword(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email });

    try {
      user.password = password;
      user.save();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async findUser(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    }
    return user;
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email
    }));
  }
}
