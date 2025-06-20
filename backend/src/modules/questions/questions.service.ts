import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QuestionPattern } from 'src/entities/question-pattern.entity';
import { Question } from '../../entities/question.entity';
import { PatternsService } from '../patterns/patterns.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @InjectRepository(QuestionPattern)
    private readonly questionPatternRepo: Repository<QuestionPattern>,
    private readonly patternService: PatternsService,
  ) {}

  async findAllByUser(userId: string) {
    return this.questionRepo.find({
      where: { created_by: { id: userId } },
      relations: ['created_by'],
      order: {
        updated_at: 'desc',
      },
    });
  }

  async findById(userId: string, questionId: string) {
    const question = await this.questionRepo.findOne({
      where: { id: questionId, created_by: { id: userId } },
      relations: ['created_by'],
    });

    if (!question) {
      throw new NotFoundException(
        'Pregunta no encontrada o no tienes permisos',
      );
    }

    const relations = await this.questionPatternRepo.find({
      where: { question: { id: questionId } },
      relations: ['pattern'],
    });

    return {
      ...question,
      patterns: relations.map((r) => r.pattern),
    };
  }

  async create(userId: string, dto: CreateQuestionDto) {
    const { pattern_ids, ...rest } = dto;

    const question = this.questionRepo.create({
      ...rest,
      created_by: { id: userId },
    });

    await this.questionRepo.save(question);

    if (pattern_ids && pattern_ids.length > 0) {
      const patterns = await this.patternService.findByIds(pattern_ids);

      const relations = patterns.map((pattern) =>
        this.questionPatternRepo.create({
          question,
          pattern,
        }),
      );

      await this.questionPatternRepo.save(relations);
    }

    return question;
  }

  async update(userId: string, questionId: string, dto: UpdateQuestionDto) {
    const { pattern_ids, ...rest } = dto;

    const question = await this.questionRepo.findOne({
      where: { id: questionId, created_by: { id: userId } },
    });

    if (!question) {
      throw new NotFoundException(
        'Pregunta no encontrada o no tienes permisos',
      );
    }

    Object.assign(question, rest);
    await this.questionRepo.save(question);

    if (pattern_ids) {
      await this.questionPatternRepo.delete({ question_id: questionId });

      if (pattern_ids.length > 0) {
        const patterns = await this.patternService.findByIds(pattern_ids);

        const newRelations = patterns.map((pattern) =>
          this.questionPatternRepo.create({
            question,
            pattern,
          }),
        );

        await this.questionPatternRepo.save(newRelations);
      }
    }

    return question;
  }

  async delete(userId: string, questionId: string) {
    const result = await this.questionRepo.delete({
      id: questionId,
      created_by: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Pregunta no encontrada o no tienes permisos',
      );
    }
  }
}
