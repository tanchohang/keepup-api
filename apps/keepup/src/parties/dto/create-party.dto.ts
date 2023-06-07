import { ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreatePartyDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  circle: string;
  @ArrayNotEmpty()
  users: string[];
}
