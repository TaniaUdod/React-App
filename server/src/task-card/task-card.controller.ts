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
  Query,
} from '@nestjs/common';
import { TaskCardService } from './task-card.service';
import { CreateTaskCardDto } from './dto/create-task-card.dto';
import { UpdateTaskCardDto } from './dto/update-task-card.dto';
import { MoveTaskCardDto } from './dto/move-task-card.dto';

@Controller('cards')
export class TaskCardController {
  constructor(private readonly taskCardService: TaskCardService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // create(
  //   @Body() createTaskCardDto: CreateTaskCardDto,
  //   @Query('id') id: string,
  // ) {
  //   return this.taskCardService.create(createTaskCardDto, +id);
  // }

  // @Get()
  // findAll() {
  //   return this.taskCardService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.taskCardService.findOne(+id);
  // }

  // @Patch(':id')
  // @UsePipes(new ValidationPipe())
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTaskCardDto: UpdateTaskCardDto,
  // ) {
  //   return this.taskCardService.update(+id, updateTaskCardDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.taskCardService.remove(+id);
  // }

  // @Patch(':id/move')
  // @UsePipes(new ValidationPipe())
  // move(@Param('id') id: string, @Body() moveTaskCardDto: MoveTaskCardDto) {
  //   return this.taskCardService.move(+id, moveTaskCardDto);
  // }
}
