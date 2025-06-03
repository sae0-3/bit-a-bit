import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pattern } from '../../entities/pattern.entity';

@Injectable()
export class PatternsService {
  constructor(
    @InjectRepository(Pattern)
    private readonly patternRepo: Repository<Pattern>,
  ) {}

  async findAllFiltered(isActive: boolean) {
    const where = isActive ? { is_active: isActive } : {};
    return await this.patternRepo.find({ where });
  }

  async findByCode(code: string) {
    const pattern = await this.patternRepo.findOne({
      where: { code },
    });

    if (!pattern) {
      throw new NotFoundException('Patrón no encontrado');
    }

    return pattern;
  }

  async findById(id: number) {
    const pattern = await this.patternRepo.findOne({
      where: { id },
    });

    if (!pattern) {
      throw new NotFoundException('Patrón no encontrado');
    }

    return pattern;
  }

  async update(id: number, updateData: Partial<Pattern>) {
    const pattern = await this.findById(id);

    Object.assign(pattern, updateData);
    return await this.patternRepo.save(pattern);
  }
}
