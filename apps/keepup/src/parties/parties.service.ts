import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party } from './entities/party.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CirclesService } from '../circles/circles.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PartiesService {
  constructor(
    private circlesService: CirclesService,
    private usersService: UsersService,

    @InjectModel(Party.name) private partyModel: Model<Party>,
  ) {}

  async create(createPartyDto: CreatePartyDto, uid: string): Promise<void> {
    /**
     * Creating a new party automaticcally creates a Circle for the user
     */
    try {
      const user = await this.usersService.findOne(uid);
      console.log(user.get('circles'));
      // if (user.get) {
      // }
      // const circle = await this.circlesService.create({
      //   name: 'default',
      // });
      // return await this.partyModel.create(createPartyDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Party[]> {
    try {
      return await this.partyModel.find().select('-password');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Party> {
    try {
      return await this.partyModel.findById(id).select('-password');
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updatePartyDto: UpdatePartyDto): Promise<Party> {
    try {
      return await this.partyModel
        .findByIdAndUpdate(id, updatePartyDto)
        .select('-password');
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<Party> {
    try {
      return await this.partyModel.findByIdAndDelete(id).select('-password');
    } catch (error) {
      throw error;
    }
  }
}
