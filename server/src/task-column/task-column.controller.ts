import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskColumnService } from './task-column.service';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';

@Controller('columns')
export class TaskColumnController {
  constructor(private readonly taskColumnService: TaskColumnService) {}

  @Post(':taskListId')
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTaskColumnDto: CreateTaskColumnDto,
    @Param('taskListId') taskListId: number,
  ) {
    return this.taskColumnService.create(createTaskColumnDto, taskListId);
  }

  @Get()
  findAll(@Param('taskListId') taskListId: number) {
    return this.taskColumnService.findAll(taskListId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.taskColumnService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: number,
    @Body() updateTaskColumnDto: UpdateTaskColumnDto,
  ) {
    return this.taskColumnService.update(id, updateTaskColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.taskColumnService.remove(id);
  }
}
