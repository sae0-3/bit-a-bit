import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ValidSolution } from '../../entities/valid-solution.entity';
import { QuestionsModule } from '../questions/questions.module';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ValidSolution]), QuestionsModule],
  providers: [SolutionsService],
  controllers: [SolutionsController],
  exports: [SolutionsService],
})
export class SolutionsModule {}
