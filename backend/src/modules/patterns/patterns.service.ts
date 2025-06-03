import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

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

  async findByIds(ids: number[]): Promise<Pattern[]> {
    const patterns = await this.patternRepo.findBy({ id: In(ids) });

    if (patterns.length !== ids.length) {
      const foundIds = patterns.map((p) => p.id);
      const missingIds = ids.filter((id) => !foundIds.includes(id));

      throw new NotFoundException(
        `Los siguientes IDs de patrón no fueron encontrados: ${missingIds.join(', ')}`,
      );
    }

    return patterns;
  }
}
