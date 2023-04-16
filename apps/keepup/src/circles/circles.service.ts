import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Circle } from './entities/circle.entity';
import { Model } from 'mongoose';

@Injectable()
export class CirclesService {
  constructor(@InjectModel(Circle.name) private circleModel: Model<Circle>) {}

  async create(uid: string): Promise<Circle> {
    try {
      return await this.circleModel.create({
        creator: uid,
        users: [uid],
      });
    } catch (error) {
      throw error;
    }
  }

  // async findAll(): Promise<Circle[]> {
  //   try {
  //     return await this.circleModel.find().select('-password');
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async findOne(id: string): Promise<Circle> {
    try {
      return await this.circleModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async addUser(id: string, uid: string): Promise<Circle> {
    try {
      const circle = await this.circleModel.findById(id);
      return await circle.updateOne({
        ...circle.users.filter((user) => user.id !== uid),
        uid,
      });
    } catch (error) {
      throw error;
    }
  }

  async removeUser(id: string, uid: string): Promise<Circle> {
    try {
      const circle = await this.circleModel.findById(id);
      return await circle.updateOne({
        ...circle.users.filter((user) => user.id !== uid),
      });
    } catch (error) {
      throw error;
    }
  }
}
