import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';

@Controller('lists')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createTaskListDto: CreateTaskListDto) {
    return this.taskListService.create(createTaskListDto);
  }
}
