import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInterviewUseCase } from './application/usecases/create-interview.usecase';
import { PrismaInterviewRepository } from './infrastructure/persistence/repository/prisma-interview.repository';
import { InterviewRepository } from './domain/repositories/interview.repository';
import { InterviewController } from './infrastructure/rest/interview.controller';
import { CandidateModule } from '../candidate/candidate.module';
import { GetInterviewUseCase } from './application/usecases/get-interview.usecase';

@Module({
  imports: [CandidateModule],
  controllers: [InterviewController],
  providers: [
    PrismaService,
    CreateInterviewUseCase,
    GetInterviewUseCase,
    PrismaInterviewRepository,
    {
      provide: InterviewRepository,
      useClass: PrismaInterviewRepository,
    },
  ],
})
export class InterviewModule {}
