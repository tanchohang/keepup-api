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

@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesService: PartiesService) {}

  @Post()
  create(@Body() createPartyDto: CreatePartyDto, @Request() req) {
    return this.partiesService.create(createPartyDto, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyDto: UpdatePartyDto) {
    return this.partiesService.update(+id, updatePartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partiesService.remove(id);
  }

  // Non-CRUD paths
  @Get('circle/:cid')
  findAll(@Param('cid') cid: string) {
    return this.partiesService.findAll(cid);
  }
}
