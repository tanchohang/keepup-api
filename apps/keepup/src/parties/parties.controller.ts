import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { PartiesService } from './parties.service';
import { CreatePartyDto } from './dto/create-party.dto';
import { UpdatePartyDto } from './dto/update-party.dto';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  async create(@Body() createPartyDto: CreatePartyDto, @Request() req) {
    return await this.partiesService.create(createPartyDto, req.user.id);
  }
  @Get('')
  async findAllByCircle(@Request() req) {
    const res = await this.partiesService.findAll(req.user.id);
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.partiesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePartyDto: UpdatePartyDto,
  ) {
    return await this.partiesService.update(id, updatePartyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.partiesService.remove(id);
  }

  /****Message Services */

  @Get(':pid/messages')
  async getAllMessages(@Param('pid') pid: string) {
    return await this.partiesService.getMessages(pid);
  }

  @Post(':pid/messages')
  async addMessageToParty(
    @Param('pid') pid: string,
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    const res = await this.partiesService.addMessage(
      pid,
      createMessageDto,
      req.user.id,
    );
    return res;
  }
  @Delete(':pid/messages')
  async removeMessageToParty(
    @Param('pid') pid: string,
    createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    const res = await this.partiesService.addMessage(
      pid,
      createMessageDto,
      req.user.id,
    );
    return res;
  }
}
