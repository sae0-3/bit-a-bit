import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './modules/auth/auth.module';
import { PatternsModule } from './modules/patterns/patterns.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { SolutionsModule } from './modules/solutions/solutions.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule.forRoot(),
    AuthModule,
    PatternsModule,
    QuestionsModule,
    SolutionsModule,
  ],
})
export class AppModule {}
