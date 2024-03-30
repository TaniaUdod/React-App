import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskCardDto } from './dto/create-task-card.dto';
import { UpdateTaskCardDto } from './dto/update-task-card.dto';
import { MoveTaskCardDto } from './dto/move-task-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCard } from './entities/task-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskCardService {
  constructor(
    @InjectRepository(TaskCard)
    private readonly taskCardRepository: Repository<TaskCard>,
  ) {}

  // async create(createTaskCardDto: CreateTaskCardDto, id: number) {
  //   const isExist = await this.taskCardRepository.findOne({
  //     where: {
  //       taskList: { id },
  //       taskColumns: { id },
  //       title: createTaskCardDto.title,
  //     },
  //   });

  //   if (isExist) throw new BadRequestException('This title already exists!');

  //   const taskCard = {
  //     title: createTaskCardDto.title,
  //     description: createTaskCardDto.description,
  //     dueDate: createTaskCardDto.dueDate,
  //     priority: createTaskCardDto.priority,
  //     taskList: { id },
  //     taskColumns: { id },
  //   };

  // return await this.taskCardRepository.save(taskCard);
  // }

  // async findAll() {
  //   return await this.taskCardRepository.find();
  // }

  // async findOne(id: number) {
  //   const taskCard = await this.taskCardRepository.findOne(id);
  //   if (!taskCard) {
  //     throw new NotFoundException(`Task card with ID ${id} not found`);
  //   }
  //   return taskCard;
  // }

  // async update(id: number, updateTaskCardDto: UpdateTaskCardDto) {
  //   const taskCard = await this.taskCardRepository.findOne(id);
  //   if (!taskCard) {
  //     throw new NotFoundException(`Task card with ID ${id} not found`);
  //   }
  //   return await this.taskCardRepository.save({
  //     ...taskCard,
  //     ...updateTaskCardDto,
  //   });
  // }

  // async remove(id: number) {
  //   const taskCard = await this.taskCardRepository.findOne(id);
  //   if (!taskCard) {
  //     throw new NotFoundException(`Task card with ID ${id} not found`);
  //   }
  //   return await this.taskCardRepository.remove(taskCard);
  // }

  // async move(id: number, moveTaskCardDto: MoveTaskCardDto) {
  //   const taskCard = await this.taskCardRepository.findOne(id);
  //   if (!taskCard) {
  //     throw new NotFoundException(`Task card with ID ${id} not found`);
  //   }
  //   taskCard.columnId = moveTaskCardDto.columnId;
  //   return await this.taskCardRepository.save(taskCard);
  // }
}
