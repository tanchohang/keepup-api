import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party } from './entities/party.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CirclesService } from '../circles/circles.service';

@Injectable()
export class PartiesService {
  constructor(
    private circlesService: CirclesService,

    @InjectModel(Party.name) private partyModel: Model<Party>,
  ) {}

  async create(createPartyDto: CreatePartyDto): Promise<Party> {
    /**
     * Creating a new party automaticcally creates a Circle for the user
     */
    try {
      // const circle = await this.circlesService.create({
      //   name: 'default',
      // });
      return await this.partyModel.create(createPartyDto);
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
