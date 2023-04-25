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

@Controller('circles')
export class CirclesController {
  constructor(private readonly circlesService: CirclesService) {}

  @Post()
  async create(@Body() createCircleDto: CreateCircleDto, @Request() req) {
    return await this.circlesService.create(createCircleDto, req.user.id);
  }
  @Get('/creator')
  async findAll(@Request() req) {
    return await this.circlesService.findAllByCreator(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.circlesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCircleDto: UpdateCircleDto,
    @Request() req,
  ) {
    return await this.circlesService.addUser(id, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    return await this.circlesService.remove(id, req.user.id);
  }
}
