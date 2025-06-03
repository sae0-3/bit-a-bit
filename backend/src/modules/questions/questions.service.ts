import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from '../../entities/question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async findAllByUser(userId: string) {
    return this.questionRepo.find({
      where: { created_by: { id: userId } },
      relations: ['created_by'],
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

    return question;
  }

  async create(userId: string, dto: CreateQuestionDto) {
    const question = this.questionRepo.create({
      ...dto,
      created_by: { id: userId },
    });

    return await this.questionRepo.save(question);
  }

  async update(userId: string, questionId: string, dto: UpdateQuestionDto) {
    const question = await this.questionRepo.findOne({
      where: { id: questionId, created_by: { id: userId } },
    });

    if (!question) {
      throw new NotFoundException(
        'Pregunta no encontrada o no tienes permisos',
      );
    }

    Object.assign(question, dto);
    return await this.questionRepo.save(question);
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
