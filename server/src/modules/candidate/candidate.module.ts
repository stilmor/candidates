// candidate.module.ts

import { Module } from '@nestjs/common';
import { CreateCandidateController } from './infrastructure/rest/candidate.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateCandidateUseCase } from './application/usecases/create-candidate.use-case';
import { PrismaCandidateRepository } from './infrastructure/persistence/repository/prisma-candidate.repository';
import { CandidateRepository } from './domain/repositories/candidate.repository';

@Module({
  controllers: [CreateCandidateController],
  providers: [
    PrismaService,
    CreateCandidateUseCase,
    PrismaCandidateRepository,
    {
      provide: CandidateRepository,
      useClass: PrismaCandidateRepository,
    },
  ],
})
export class CandidateModule {}
