import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdatePatternDto } from './dto/update-pattern.dto';
import { PatternsService } from './patterns.service';

@Controller('patterns')
@UseGuards(JwtAuthGuard)
export class PatternsController {
  constructor(private readonly patternsService: PatternsService) {}

  @Get()
  findAll(@Query('active') active?: string) {
    const isActive = active === 'true';
    return this.patternsService.findAllFiltered(isActive);
  }

  @Get('by-code/:code')
  findByCode(@Param('code') code: string) {
    return this.patternsService.findByCode(code);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.patternsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatternDto: UpdatePatternDto,
  ) {
    return this.patternsService.update(id, updatePatternDto);
  }
}
