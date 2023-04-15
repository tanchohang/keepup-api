import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Email is already in use');
      }
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().select('-password');
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userModel.findOne({ username });
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userModel
        .findByIdAndUpdate(id, updateUserDto)
        .select('-password');
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(id).select('-password');
    } catch (error) {
      throw error;
    }
  }

  // async validateUsernamePassword(
  //   username: string,
  //   password: string,
  // ): Promise<User> {
  //   return await this.userModel.findOne({ username }.th
  //     if (user.comparePassword(password, user.password)) return user as User;
  //   });
  // }
  // async validateEmailPassword(email: string, password: string): Promise<User> {
  //   return await this.userModel.findOne({ email }, (error, user) => {
  //     if (error) throw error;
  //     return user.comparePassword(password, user.password);
  //   });
  // }
  // //END OF CRUD operations
}
