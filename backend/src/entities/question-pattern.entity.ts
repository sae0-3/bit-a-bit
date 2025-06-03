import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Pattern } from './pattern.entity';
import { Question } from './question.entity';

@Entity('question_patterns')
export class QuestionPattern {
  @PrimaryColumn()
  question_id: string;

  @PrimaryColumn()
  pattern_id: number;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => Pattern, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pattern_id' })
  pattern: Pattern;
}
