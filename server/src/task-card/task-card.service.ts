import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskCardDto } from './dto/create-task-card.dto';
import { UpdateTaskCardDto } from './dto/update-task-card.dto';
import { MoveTaskCardDto } from './dto/move-task-card.dto';
import { TaskCard } from './entities/task-card.entity';
import { TaskColumn } from 'src/task-column/entities/task-column.entity';

@Injectable()
export class TaskCardService {
  constructor(
    @InjectRepository(TaskCard)
    private readonly taskCardRepository: Repository<TaskCard>,
  ) {}

  async create(createTaskCardDto: CreateTaskCardDto, taskColumnId: number) {
    const isExist = await this.taskCardRepository.findOne({
      where: {
        taskColumn: { id: taskColumnId },
        title: createTaskCardDto.title,
      },
    });

    if (isExist) throw new BadRequestException('This title already exists!');

    const taskCard = {
      title: createTaskCardDto.title,
      description: createTaskCardDto.description || '',
      dueDate: createTaskCardDto.dueDate,
      priority: createTaskCardDto.priority,
      taskColumn: { id: taskColumnId },
    };

    return await this.taskCardRepository.save(taskCard);
  }

  async findAll(taskColumnId: number) {
    const taskCards = await this.taskCardRepository.find({
      where: { taskColumn: { id: taskColumnId } },
    });

    return taskCards;
  }

  async findOne(taskColumnId: number, id: number) {
    const taskCard = await this.taskCardRepository.findOne({
      where: { id, taskColumn: { id: taskColumnId } },
      relations: { taskColumn: true },
    });

    if (!taskCard) {
      throw new NotFoundException('Task card not found');
    }

    return taskCard;
  }

  async update(
    taskColumnId: number,
    id: number,
    updateTaskCardDto: UpdateTaskCardDto,
  ) {
    const taskCard = await this.taskCardRepository.findOne({
      where: { id, taskColumn: { id: taskColumnId } },
    });

    if (!taskCard) {
      throw new NotFoundException('Task card not found');
    }

    return await this.taskCardRepository.save({
      ...taskCard,
      ...updateTaskCardDto,
    });
  }

  async remove(taskColumnId: number, id: number) {
    const taskCard = await this.taskCardRepository.findOne({
      where: { id, taskColumn: { id: taskColumnId } },
    });

    if (!taskCard) {
      throw new NotFoundException('Task card not found');
    }

    return await this.taskCardRepository.remove(taskCard);
  }

  async move(
    taskColumnId: number,
    id: number,
    moveTaskCardDto: MoveTaskCardDto,
  ) {
    const taskCard = await this.taskCardRepository.findOne({
      where: { id, taskColumn: { id: taskColumnId } },
      relations: { taskColumn: true },
    });

    if (!taskCard) {
      throw new NotFoundException('Task card not found');
    }

    if (taskCard.taskColumn.id === moveTaskCardDto.targetColumnId) {
      throw new BadRequestException(
        'Task card is already in the target column!',
      );
    }

    const newTaskColumn = await this.taskCardRepository.manager.findOne(
      TaskColumn,
      { where: { id: moveTaskCardDto.targetColumnId } },
    );

    if (!newTaskColumn) {
      throw new NotFoundException(
        'Target task column is not available for moving the card to!',
      );
    }

    taskCard.taskColumn = newTaskColumn;

    return await this.taskCardRepository.save(taskCard);
  }
}
