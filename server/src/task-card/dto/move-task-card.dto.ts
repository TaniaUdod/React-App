import { IsNotEmpty, IsNumber } from 'class-validator';

export class MoveTaskCardDto {
  @IsNotEmpty()
  @IsNumber()
  columnId: number;
}
