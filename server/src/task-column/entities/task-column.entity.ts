import { TaskCard } from 'src/task-card/entities/task-card.entity';
import { TaskList } from 'src/task-list/entities/task-list.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TaskColumn {
  @PrimaryGeneratedColumn({ name: 'taskColumn_id' })
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => TaskList, (taskList) => taskList.taskColumns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskList_id' })
  taskList: TaskList;

  @OneToMany(() => TaskCard, (taskCard) => taskCard.taskColumn, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'taskCard_id' })
  taskCards: TaskCard[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
