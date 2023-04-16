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
  create(@Body() createCircleDto: CreateCircleDto, @Request() req) {
    return this.circlesService.create(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circlesService.findOne(id);
  }

  @Patch(':id')
  addUser(@Param('id') id: string, @Request() req) {
    return this.circlesService.addUser(id, req.user.userId);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string, @Request() req) {
    return this.circlesService.removeUser(id, req.user.userId);
  }
}
