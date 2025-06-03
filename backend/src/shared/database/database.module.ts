import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Pattern } from 'src/entities/pattern.entity';
import { QuestionPattern } from 'src/entities/question-pattern.entity';
import { Question } from 'src/entities/question.entity';
import { User } from 'src/entities/user.entity';
import { ValidSolution } from 'src/entities/valid-solution.entity';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get(
              'DATABASE_URL',
              'postgresql://postgres:1234@localhost:5432/questeditor',
            ),
            entities: [User, Question, QuestionPattern, ValidSolution, Pattern],
            synchronize: true,
            logging: true,
            ssl:
              configService.get('NODE_ENV') === 'production'
                ? { rejectUnauthorized: false }
                : false,
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
