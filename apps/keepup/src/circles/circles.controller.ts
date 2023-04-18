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
    return this.circlesService.create(createCircleDto, req.user.userId);
  }
  @Get('/creator')
  findAll(@Request() req) {
    return this.circlesService.findAllByCreator(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.circlesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCircleDto: UpdateCircleDto,
    @Request() req,
  ) {
    return this.circlesService.addUser(id, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.circlesService.remove(id, req.user.userId);
  }
}
