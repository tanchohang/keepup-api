import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Circle } from './entities/circle.entity';
import { Model } from 'mongoose';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { CreateCircleDto } from './dto/create-circle.dto';

@Injectable()
export class CirclesService {
  constructor(@InjectModel(Circle.name) private circleModel: Model<Circle>) {}

  async create(createCircleDto: CreateCircleDto, uid: string): Promise<Circle> {
    try {
      const circle = await this.circleModel.create({
        creator: uid,
        ...createCircleDto,
      });

      return circle;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<any> {
    try {
      return await this.circleModel.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Circle> {
    try {
      return await this.circleModel.findById(id).populate('users');
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    updateCircleDto: UpdateCircleDto,
    uid: string,
  ): Promise<Circle> {
    try {
      const circle = await this.circleModel.findById({ id, creator: uid });
      circle.name = updateCircleDto.name;
      // circle.users = [...updateCircleDto.users, ...circle.users];
      circle.save();
      return circle;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, uid: string): Promise<any> {
    try {
      return await this.circleModel.deleteOne({ id, creator: uid });
    } catch (error) {
      throw error;
    }
  }

  // Nom-Crud operations

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
