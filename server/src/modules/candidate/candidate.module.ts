import { Module } from '@nestjs/common';
import { CandidateController } from './infrastructure/rest/candidate.controller';
import { PrismaService } from 'src/prisma.service';
import { CreateCandidateUseCase } from './application/usecases/create-candidate.usecase';
import { PrismaCandidateRepository } from './infrastructure/persistence/repository/prisma-candidate.repository';
import { CandidateRepository } from './domain/repositories/candidate.repository';
import { GetCandidatesUseCase } from './application/usecases/get-candidate.usecase';
import { UpdateCandidateUseCase } from './application/usecases/update-candidate.usecase';
import { DeleteCandidateUseCase } from './application/usecases/delete-candidate.usecase';

@Module({
  controllers: [CandidateController],
  providers: [
    PrismaService,
    CreateCandidateUseCase,
    GetCandidatesUseCase,
    UpdateCandidateUseCase,
    DeleteCandidateUseCase,
    PrismaCandidateRepository,
    {
      provide: CandidateRepository,
      useClass: PrismaCandidateRepository,
    },
  ],
  exports: [PrismaCandidateRepository, CandidateRepository],
})
export class CandidateModule {}
