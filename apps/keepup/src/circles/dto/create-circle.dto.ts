import { IsNotEmpty } from 'class-validator';

export class CreateCircleDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  users: [string];
}
