import { IsNotEmpty } from 'class-validator';

export class CreateTaskColumnDto {
  @IsNotEmpty()
  title: string;
}
