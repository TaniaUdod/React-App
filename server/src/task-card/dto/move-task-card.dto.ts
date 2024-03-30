import { IsNotEmpty, IsNumber } from 'class-validator';

export class MoveTaskCardDto {
  @IsNotEmpty()
  @IsNumber()
  targetColumnId: number;
}
