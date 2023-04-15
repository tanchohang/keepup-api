import { IsNotEmpty } from 'class-validator';

export class CreatePartyDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  users: string[];
}
