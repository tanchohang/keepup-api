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
    return await this.partiesService.update(+id, updatePartyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.partiesService.remove(id);
  }

  // Non-CRUD paths
  // @Get(':cid')
  // async findAllByCircle(@Param('cid') cid: string@req) {
  //   const res = await this.partiesService.findAll(cid,);
  //   return res;
  // }
}
