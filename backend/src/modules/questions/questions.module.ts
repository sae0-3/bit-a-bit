import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionPattern } from 'src/entities/question-pattern.entity';
import { Question } from '../../entities/question.entity';
import { PatternsModule } from '../patterns/patterns.module';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, QuestionPattern]),
    PatternsModule,
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [QuestionsService],
})
export class QuestionsModule {}
