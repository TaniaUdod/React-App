import { TaskCard } from 'src/task-card/entities/task-card.entity';
import { TaskColumn } from 'src/task-column/entities/task-column.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn({ name: 'taskList_id' })
  id: number;

  @Column()
  title: string;

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.taskList, {
    onDelete: 'CASCADE',
  })
  taskColumns: TaskColumn[];

  @OneToMany(() => TaskCard, (taskCard) => taskCard.taskList, {
    onDelete: 'CASCADE',
  })
  taskCards: TaskCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
