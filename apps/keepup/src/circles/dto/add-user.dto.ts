import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class AddUserByEmailDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  circle: string;
}
