// candidate.module.ts

import { Module } from '@nestjs/common';
import { CreateCandidateController } from './infrastructure/rest/candidate.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateCandidateUseCase } from './application/usecases/create-candidate.use-case';

@Module({
  controllers: [CreateCandidateController],
  providers: [PrismaService, CreateCandidateUseCase],
})
export class CandidateModule {}
