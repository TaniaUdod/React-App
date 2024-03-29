import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskColumn } from './entities/task-column.entity';

@Injectable()
export class TaskColumnService {
  constructor(
    @InjectRepository(TaskColumn)
    private readonly taskColumnRepository: Repository<TaskColumn>,
  ) {}

  async create(createTaskColumnDto: CreateTaskColumnDto, id: number) {
    const isExist = await this.taskColumnRepository.findOne({
      where: {
        taskList: { id },
        title: createTaskColumnDto.title,
      },
    });

    if (isExist) throw new BadRequestException('This title already exist!');

    const column = { title: createTaskColumnDto.title, taskList: { id } };

    return await this.taskColumnRepository.save(column);
  }

  async findAll(id: number) {
    return await this.taskColumnRepository.find({
      where: {
        taskList: { id },
      },
      relations: { taskCards: true },
    });
  }

  async findOne(id: number) {
    const column = await this.taskColumnRepository.findOne({
      where: { id },

      relations: { taskList: true, taskCards: true },
    });

    if (!column) throw new NotFoundException('Column not found!');

    return column;
  }

  async update(id: number, updateTaskColumnDto: UpdateTaskColumnDto) {
    const column = await this.taskColumnRepository.findOne({
      where: { id },
      relations: { taskList: true, taskCards: true },
    });

    if (!column) throw new NotFoundException('Column not found!');

    const updatedColumn = { ...column, ...updateTaskColumnDto };

    return await this.taskColumnRepository.save(updatedColumn);
  }

  async remove(id: number) {
    const column = await this.taskColumnRepository.findOne({ where: { id } });

    if (!column) throw new NotFoundException('Column not found!');

    return await this.taskColumnRepository.remove(column);
  }
}
