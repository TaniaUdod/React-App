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
import { TaskCardService } from './task-card.service';
import { CreateTaskCardDto } from './dto/create-task-card.dto';
import { UpdateTaskCardDto } from './dto/update-task-card.dto';
import { MoveTaskCardDto } from './dto/move-task-card.dto';

@Controller('cards')
export class TaskCardController {
  constructor(private readonly taskCardService: TaskCardService) {}

  @Post(':taskColumnId')
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTaskCardDto: CreateTaskCardDto,
    @Param('taskColumnId') taskColumnId: number,
  ) {
    return this.taskCardService.create(createTaskCardDto, taskColumnId);
  }

  @Get(':taskColumnId')
  findAll(@Param('taskColumnId') taskColumnId: number) {
    return this.taskCardService.findAll(taskColumnId);
  }

  @Get(':taskColumnId/:id')
  findOne(
    @Param('taskColumnId') taskColumnId: number,
    @Param('id') id: number,
  ) {
    return this.taskCardService.findOne(taskColumnId, id);
  }

  @Patch(':taskColumnId/:id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('taskColumnId') taskColumnId: number,
    @Param('id') id: number,
    @Body() updateTaskCardDto: UpdateTaskCardDto,
  ) {
    return this.taskCardService.update(taskColumnId, id, updateTaskCardDto);
  }

  @Delete(':taskColumnId/:id')
  remove(@Param('taskColumnId') taskColumnId: number, @Param('id') id: number) {
    return this.taskCardService.remove(taskColumnId, id);
  }

  @Patch(':taskColumnId/move/:id')
  @UsePipes(new ValidationPipe())
  move(
    @Param('taskColumnId') taskColumnId: number,
    @Param('id') id: number,
    @Body() moveTaskCardDto: MoveTaskCardDto,
  ) {
    return this.taskCardService.move(taskColumnId, id, moveTaskCardDto);
  }
}
