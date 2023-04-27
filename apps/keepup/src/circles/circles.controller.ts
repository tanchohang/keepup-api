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
import { CirclesService } from './circles.service';
import { CreateCircleDto } from './dto/create-circle.dto';
import { UpdateCircleDto } from './dto/update-circle.dto';
import { AddUserByEmailDto } from './dto/add-user.dto';

@Controller('circles')
export class CirclesController {
  constructor(private readonly circlesService: CirclesService) {}

  @Post()
  async create(@Body() createCircleDto: CreateCircleDto, @Request() req) {
    return await this.circlesService.create(createCircleDto, req.user.id);
  }
  @Get('/creator')
  async findAll(@Request() req) {
    return await this.circlesService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.circlesService.findOne(id);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateCircleDto: UpdateCircleDto,
  //   @Request() req,
  // ) {
  //   return 'test';
  // }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return await this.circlesService.remove(id, req.user.id);
  }

  @Patch('/email')
  async addUserByEmail(@Body() { email, circle }: AddUserByEmailDto) {
    return await this.circlesService.addToCircleByEmail(email, circle);
  }
}
