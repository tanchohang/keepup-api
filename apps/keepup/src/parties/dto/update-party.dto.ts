import { PartialType } from '@nestjs/mapped-types';
import { CreatePartyDto } from './create-party.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdatePartyDto extends PartialType(CreatePartyDto) {
  @IsNotEmpty()
  name?: string;
  @IsNotEmpty()
  user?: string;
}
