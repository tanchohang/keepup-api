import { Injectable } from '@nestjs/common';
import { CreateCircleDto } from './dto/create-circle.dto';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Circle } from './entities/circle.entity';
import { Model } from 'mongoose';

@Injectable()
export class CirclesService {
  constructor(@InjectModel(Circle.name) private circleModel: Model<Circle>) {}

  async create(createCircleDto: CreateCircleDto): Promise<Circle> {
    try {
      return await this.circleModel.create(createCircleDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Circle[]> {
    try {
      return await this.circleModel.find().select('-password');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Circle> {
    try {
      return await this.circleModel.findById(id).select('-password');
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateCircleDto: UpdateCircleDto): Promise<Circle> {
    try {
      return await this.circleModel
        .findByIdAndUpdate(id, updateCircleDto)
        .select('-password');
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Circle> {
    try {
      return await this.circleModel.findByIdAndDelete(id).select('-password');
    } catch (error) {
      throw error;
    }
  }
}
