import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party } from './entities/party.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CirclesService } from '../circles/circles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class PartiesService {
  constructor(
    private circlesService: CirclesService,
    private usersService: UsersService,

    @InjectModel(Party.name) private partyModel: Model<Party>,
  ) {}

  async create(createPartyDto: CreatePartyDto, uid: string): Promise<Party> {
    try {
      return await this.partyModel.create({ ...createPartyDto, creator: uid });
    } catch (error) {
      throw error;
    }
  }

  async findAll(uid: string): Promise<Party[]> {
    try {
      const partiesWithMe = await this.partyModel.find({ users: uid });
      const myParties = await this.partyModel.find({ creator: uid });

      return partiesWithMe.concat(myParties);
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
      return await this.partyModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
