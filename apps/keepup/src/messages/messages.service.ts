import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messsageModel: Model<Message>,
  ) {}
  async create(createMessageDto: CreateMessageDto, uid: string) {
    const response = await this.messsageModel.create({
      sender: uid,
      ...createMessageDto,
    });
    return response;
  }

  async findAllForParty(pid: string) {
    return await this.messsageModel.find({ party: pid });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
