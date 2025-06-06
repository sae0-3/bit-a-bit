import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidSolution } from 'src/entities/valid-solution.entity';
import { PatternFunctionsService } from '../patterns/pattern-function.service';
import { QuestionsService } from '../questions/questions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(ValidSolution)
    private readonly validSolutionRepo: Repository<ValidSolution>,
    private readonly questionsService: QuestionsService,
    private readonly patternFunctionsService: PatternFunctionsService,
  ) {}

  async findAllByQuestionId(userId: string, questionId: string) {
    await this.questionsService.findById(userId, questionId);

    return this.validSolutionRepo.find({
      where: { question: { id: questionId } },
    });
  }

  async findById(userId: string, solutionId: string) {
    return this.assertOwnership(userId, solutionId);
  }

  async create(userId: string, dto: CreateSolutionDto) {
    const { question_id, path } = dto;
    const question = await this.questionsService.findById(userId, question_id);

    const final_sequence = this.transformSequence(
      question.initial_sequence,
      path,
    );

    const solution = this.validSolutionRepo.create({
      question,
      path,
      final_sequence,
    });

    return this.validSolutionRepo.save(solution);
  }

  async update(userId: string, solutionId: string, dto: UpdateSolutionDto) {
    const solution = await this.assertOwnership(userId, solutionId);
    if (!dto.path) return solution;

    const question = await this.questionsService.findById(
      userId,
      solution.question.id,
    );

    const final_sequence = this.transformSequence(
      question.initial_sequence,
      dto.path,
    );

    solution.path = dto.path;
    solution.final_sequence = final_sequence;

    return this.validSolutionRepo.save(solution);
  }

  async delete(userId: string, solutionId: string) {
    const solution = await this.assertOwnership(userId, solutionId);
    const result = await this.validSolutionRepo.delete(solution.id);

    if (result.affected === 0) {
      throw new NotFoundException(
        'Pregunta no encontrada o no tienes permisos',
      );
    }
  }

  private async assertOwnership(userId: string, solutionId: string) {
    const solution = await this.validSolutionRepo.findOne({
      where: { id: solutionId },
      relations: ['question', 'question.created_by'],
    });

    if (!solution || solution.question.created_by.id !== userId) {
      throw new NotFoundException(
        'Solución no encontrada o no tienes permisos',
      );
    }

    return solution;
  }

  private transformSequence(
    sequence: Array<string | number>,
    path: Array<string>,
  ): Array<string | number> {
    let baseSequence = [...sequence];

    for (const code of path) {
      const fn = this.patternFunctionsService.getFunctionByCode(code);
      if (!fn) {
        throw new BadRequestException(`Patrón desconocido: ${code}`);
      }

      baseSequence = fn(baseSequence);
    }

    return baseSequence;
  }
}
