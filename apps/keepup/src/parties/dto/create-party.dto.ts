import { IsNotEmpty } from 'class-validator';

export class CreatePartyDto {
  @IsNotEmpty()
  name: string;
  circle: string;
  @IsNotEmpty()
  users: string[];
}
