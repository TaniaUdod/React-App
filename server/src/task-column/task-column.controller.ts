import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskColumnService } from './task-column.service';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';

@Controller('columns')
export class TaskColumnController {
  constructor(private readonly taskColumnService: TaskColumnService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(
    @Body() createTaskColumnDto: CreateTaskColumnDto,
    @Query('id') id: string,
  ) {
    return this.taskColumnService.create(createTaskColumnDto, +id);
  }

  @Get()
  findAll(@Query('id') id: string) {
    return this.taskColumnService.findAll(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskColumnService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskColumnDto: UpdateTaskColumnDto,
  ) {
    return this.taskColumnService.update(+id, updateTaskColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskColumnService.remove(+id);
  }
}
