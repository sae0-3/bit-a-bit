import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Question } from './question.entity';

@Entity('valid_solutions')
export class ValidSolution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @Column({ type: 'jsonb' })
  path: object;

  @Column({ type: 'jsonb' })
  final_sequence: Array<number | string>;

  @Column({ default: false })
  is_optimal: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
