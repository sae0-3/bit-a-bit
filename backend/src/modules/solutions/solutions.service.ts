import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ValidSolution } from 'src/entities/valid-solution.entity';
import { PatternFunctionsService } from '../patterns/pattern-function.service';
import { QuestionsService } from '../questions/questions.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { ValidateSolutionDto } from './dto/validate-solution.dto';

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(ValidSolution)
    private readonly validSolutionRepo: Repository<ValidSolution>,
    private readonly questionsService: QuestionsService,
    private readonly patternFunctionsService: PatternFunctionsService,
  ) { }

  async findAllByQuestionId(userId: string, questionId: string) {
    await this.questionsService.findById(userId, questionId);

    return this.validSolutionRepo.find({
      where: { question: { id: questionId } },
    });
  }

  async findRandomByQuestionId(userId: string, questionId: string) {
    const solutions = await this.findAllByQuestionId(userId, questionId);
    if (!solutions || solutions.length === 0) {
      return null
    }
    const solution = solutions[Math.floor(Math.random() * solutions.length)];
    console.log('Random solution:', solution);
    return solution
  }

  async findById(userId: string, solutionId: string) {
    return this.assertOwnership(userId, solutionId);
  }

  async create(userId: string, dto: CreateSolutionDto) {
    const { question_id, path } = dto;
    const question = await this.questionsService.findById(userId, question_id);

    const final_sequence = this.patternFunctionsService.transformSequence({
      sequence: question.initial_sequence,
      path,
    });

    const solution = this.validSolutionRepo.create({
      question,
      path,
      final_sequence: final_sequence.sequence,
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

    const final_sequence = this.patternFunctionsService.transformSequence({
      sequence: question.initial_sequence,
      path: dto.path,
    });

    solution.path = dto.path;
    solution.final_sequence = final_sequence.sequence;

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

  async validateSolution(userId: string, dto: ValidateSolutionDto) {
    const { path, solution_id } = dto;
    const solution = await this.assertOwnership(userId, solution_id);
    let res = true;
    if (path.length === solution.path.length) {
      for (let i = 0; i < path.length; i++) {
        if (path[i] !== solution.path[i]) {
          res = false;
        }
      }
      return {
        valid: res,
        message: res ? 'La solución es correcta' : 'La solución es incorrecta',
      };
    } else {
      return {
        valid: false,
        message: 'La cantidad de pasos no coincide con la solución esperada',
      };
    }
  }

  async getNumberSolutionsByQuestion(userId: string, questionId: string) {
    const solutions = await this.findAllByQuestionId(userId, questionId);
    const final_sequences = solutions.map(solution => solution.final_sequence);
    const unique_sequences = Array.from(
      new Set(final_sequences.map(seq => JSON.stringify(seq)))
    ).map(str => JSON.parse(str));
    return unique_sequences
  }

  async validateAllSolutions(userId: string, dto: { question_id: string; path: Array<string>, solution: Array<string> }) {
    const { question_id, path, solution } = dto;
    const solutions = await this.findAllByQuestionId(userId, question_id);
    const unique_sequences = await this.getNumberSolutionsByQuestion(userId, question_id);

    if (!solutions || solutions.length === 0) {
      throw new NotFoundException('No hay soluciones para validar');
    }

    const isValidPath = solutions.some(sol =>
      JSON.stringify(sol.path) === JSON.stringify(path)
    );

    const isValidSolution = unique_sequences.some(sol =>
      JSON.stringify(sol) === JSON.stringify(solution)
    );

    return {
      valid: isValidPath && isValidSolution,
      message: isValidSolution && isValidPath
        ? 'La solución obtenida es correcta y el patrón coincide con una solución existente'
        : isValidSolution ?
          'La solución obtenida es correcta, pero el patrón no coincide con ninguna solución existente' :
          isValidPath ?
            'El patrón coincide con una solución existente, pero la solución obtenida no es correcta' :
            'El patron y la solución no coinciden con ninguna solución existente',
    };
  }
}
