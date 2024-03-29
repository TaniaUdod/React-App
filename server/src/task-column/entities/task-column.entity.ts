import { TaskCard } from 'src/task-card/entities/task-card.entity';
import { TaskList } from 'src/task-list/entities/task-list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn({ name: 'taskColumn_id' })
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.taskColumns)
  @JoinColumn({ name: 'taskList_id' })
  taskList: TaskList;

  @ManyToOne(() => TaskCard, (taskCard) => taskCard.taskColumns)
  @JoinColumn({ name: 'taskCard_id' })
  taskCards: TaskCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
