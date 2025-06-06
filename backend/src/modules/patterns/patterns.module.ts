import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pattern } from '../../entities/pattern.entity';
import { PatternFunctionsService } from './pattern-function.service';
import { PatternsController } from './patterns.controller';
import { PatternsService } from './patterns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pattern])],
  controllers: [PatternsController],
  providers: [PatternsService, PatternFunctionsService],
  exports: [PatternsService, PatternFunctionsService],
})
export class PatternsModule {}
