import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  async create(createTaskListDto: CreateTaskListDto) {
    const existTaskList = await this.taskListRepository.findOne({
      where: { title: createTaskListDto.title },
    });

    if (existTaskList)
      throw new BadRequestException('This title already exist!');

    const taskList = await this.taskListRepository.save({
      title: createTaskListDto.title,
    });

    return { taskList };
  }
}
