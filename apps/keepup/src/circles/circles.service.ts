import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Circle } from './entities/circle.entity';
import { Model } from 'mongoose';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { CreateCircleDto } from './dto/create-circle.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CirclesService {
  constructor(
    @InjectModel(Circle.name) private circleModel: Model<Circle>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createCircleDto: CreateCircleDto, uid: string): Promise<Circle> {
    try {
      const response = await this.circleModel.create({
        creator: uid,
        ...createCircleDto,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  async findAll(uid: string): Promise<any> {
    try {
      const response = await this.circleModel.findOne({ creator: uid });
      return response;
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
      const circle = await this.circleModel.findByIdAndUpdate(id, {
        users: [],
      });
      // circle.name = updateCircleDto.name;

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

  // async addUser(id: string, uid: string): Promise<Circle> {
  //   try {
  //     const circle = await this.circleModel.findById(id);
  //     return await circle.updateOne({
  //       ...circle.users.filter((user) => user.id !== uid),
  //       uid,
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async removeUser(id: string, uid: string): Promise<Circle> {
  //   try {
  //     const circle = await this.circleModel.findById(id);
  //     return await circle.updateOne({
  //       ...circle.users.filter((user) => user.id !== uid),
  //     });
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async addToCircleByEmail(email: string, cid: string) {
    const circle = await this.circleModel.findById(cid);
    const user = await this.userModel.findOne({ email });
    if (user.id != circle.creator) {
      circle.users.push(user.id);
      circle.save();
    }
    return circle;
  }
}
