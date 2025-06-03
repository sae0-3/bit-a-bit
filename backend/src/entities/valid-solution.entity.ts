import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @Column()
  final_sequence: string;

  @Column({ default: false })
  is_optimal: boolean;
}
