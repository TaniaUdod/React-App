import { TaskColumn } from 'src/task-column/entities/task-column.entity';
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
export class TaskCard {
  @PrimaryGeneratedColumn({ name: 'taskCard_id' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  dueDate: Date;

  @Column()
  priority: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.taskCards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskList_id' })
  taskList: TaskList;

  @ManyToOne(() => TaskColumn, (taskColumn) => taskColumn.taskCards, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskColumn_id' })
  taskColumn: TaskColumn;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
