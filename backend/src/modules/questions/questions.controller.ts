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
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  findAll(@User() user: RequestUser) {
    return this.questionsService.findAllByUser(user.id);
  }

  @Get(':id')
  findOne(@User() user: RequestUser, @Param('id') id: string) {
    return this.questionsService.findById(user.id, id);
  }

  @Post()
  create(@User() user: RequestUser, @Body() dto: CreateQuestionDto) {
    return this.questionsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @User() user: RequestUser,
    @Param('id') id: string,
    @Body() dto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(user.id, id, dto);
  }

  @Delete(':id')
  delete(@User() user: RequestUser, @Param('id') id: string) {
    return this.questionsService.delete(user.id, id);
  }
}
