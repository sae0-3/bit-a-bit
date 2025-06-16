import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { User } from 'src/common/decorators/user.decorator';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { SolutionsService } from './solutions.service';

@Controller('solutions')
@UseGuards(JwtAuthGuard)
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) { }

  @Get('question/:questionId')
  findAllByQuestion(
    @User() user: RequestUser,
    @Param('questionId') questionId: string,
  ) {
    return this.solutionsService.findAllByQuestionId(user.id, questionId);
  }

  @Get(':id')
  findOne(@User() user: RequestUser, @Param('id') id: string) {
    return this.solutionsService.findById(user.id, id);
  }

  @Get('random/:questionId')
  findRandomByQuestion(
    @User() user: RequestUser,
    @Param('questionId') questionId: string,
  ) {
    return this.solutionsService.findRandomByQuestionId(user.id, questionId);
  }

  @Post()
  create(@User() user: RequestUser, @Body() dto: CreateSolutionDto) {
    return this.solutionsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @User() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateSolutionDto,
  ) {
    return this.solutionsService.update(user.id, id, dto);
  }

  @Delete(':id')
  delete(@User() user: RequestUser, @Param('id') id: string) {
    return this.solutionsService.delete(user.id, id);
  }
}
