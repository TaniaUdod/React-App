import { MinLength } from 'class-validator';

export class CreateTaskListDto {
  @MinLength(3, { message: 'Title must be more than 3 symbols' })
  title: string;
}
