import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskCardDto {
  @MinLength(3, { message: 'Title must be more than 3 symbols' })
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  priority: 'low' | 'medium' | 'high';
}
