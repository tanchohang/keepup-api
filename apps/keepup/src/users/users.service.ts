import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'apps/auth/src/auth.service';
import { CirclesService } from '../circles/circles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private circleService: CirclesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userModel.create(createUserDto);

      if (user) {
        const circle = await this.circleService.create(
          { name: 'default' },
          user.id,
        );
        if (circle) {
          user.circle = circle._id;
          user.save();
        } else {
          user.deleteOne();
        }
      }
      const token = await this.authService.login({
        username: user.username,
        id: user.id,
      });

      return { ...user.toObject(), ...token };
    } catch (error) {
      // console.error(error.keyPattern);
      if (error.code === 11000) {
        if (error.keyPattern.username) {
          throw new HttpException(
            'Username is already in use',
            HttpStatus.BAD_REQUEST,
          );
        }

        if (error.keyPattern.email) {
          throw new HttpException(
            'Email is already in use',
            HttpStatus.BAD_REQUEST,
          );
        }
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
      const res = await this.userModel.findOne({ username }).exec();
      return res;
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

  //END OF CRUD operations
}
