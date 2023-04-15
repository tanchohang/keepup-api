import { PartialType } from '@nestjs/mapped-types';
import { CreateCircleDto } from './create-circle.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateCircleDto extends PartialType(CreateCircleDto) {
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  user?: string;
}
