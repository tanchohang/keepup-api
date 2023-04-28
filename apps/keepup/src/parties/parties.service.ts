import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { Party } from './entities/party.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CirclesService } from '../circles/circles.service';
import { UsersService } from '../users/users.service';
import { Message } from '../messages/entities/message.entity';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class PartiesService {
  constructor(
    private circlesService: CirclesService,
    private usersService: UsersService,

    @InjectModel(Party.name) private partyModel: Model<Party>,
    private messageService: MessagesService,
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

  async update(id: string, updatePartyDto: UpdatePartyDto): Promise<Party> {
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

  /***Messages Related services***/
  async getMessages(pid: string): Promise<Message[]> {
    const party = await this.partyModel
      .findById(pid)
      .populate('messages')
      .exec();
    if (!party) {
      throw new Error('party not found');
    }
    return party.messages;
  }

  async addMessage(
    pid: string,
    createMessageDto: CreateMessageDto,
    uid: string,
  ): Promise<Message> {
    try {
      const party = await this.partyModel.findById(pid);
      const message = await this.messageService.create(createMessageDto, uid);
      party.messages.push(message);
      party.save();
      return message;
    } catch (error) {
      throw error;
    }
  }

  async removeMessage(pid: string, mid: string): Promise<boolean> {
    try {
      const deletedMessage = await this.messageService.remove(mid);
      const party = await this.partyModel.findById(pid);

      const msgIndex = party.messages.findIndex((msg) => msg._id === mid);
      party.messages.splice(msgIndex, 1);
      party.save();

      return true;
    } catch (error) {
      throw error;
    }
  }
}
