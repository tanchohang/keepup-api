import { IsNotEmpty } from 'class-validator';

export class CreateCircleDto {
  @IsNotEmpty()
  users: string;
}
