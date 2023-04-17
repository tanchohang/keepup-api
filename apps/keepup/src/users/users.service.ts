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

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const user = (await this.userModel.create(createUserDto)).toObject();

      const token = await this.authService.login({
        username: createUserDto.username,
        id: user.id,
      });

      return { ...user, ...token };
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

  //END OF CRUD operations
}
