import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('users')
export class UserController {
  @Get()
  getUsers() {
    return { user: 'name' };
  }
  @Get(':id')
  getUserById(@Param() { id }) {
    return { user: id };
  }
  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() user: CreateUserDto) {
    return { user };
  }
}
