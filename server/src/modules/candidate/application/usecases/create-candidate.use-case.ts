// import { Injectable } from '@nestjs/common';
// import { CreateCandidateDto } from '../dtos/create-candidate-dto';
// import { PrismaService } from 'src/prisma.service';
// import { Candidate, CandidateStatus } from '@prisma/client';

// @Injectable()
// export class CreateCandidateUseCase {
//   constructor(private prisma: PrismaService) {}

//   async execute(dto: CreateCandidateDto): Promise<Candidate> {
//     const created = await this.prisma.candidate.create({
//       data: {
//         firstName: dto.firstName,
//         lastName: dto.lastName,
//         email: dto.email,
//         phone: dto.phone,
//         observations: dto.observations,
//         status: dto.status || CandidateStatus.PENDING, // Default status if not provided
//       },
//     });
//     return created;
//   }
// }
// src/modules/candidate/application/usecases/create-candidate.use-case.ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCandidateDto } from '../dtos/create-candidate-dto';
import {
  CandidateDomain,
  CandidateStatusDomain,
} from '../../domain/entities/candidate.entity';
import { CandidateRepository } from '../../domain/repositories/candidate.repository';

@Injectable()
export class CreateCandidateUseCase {
  constructor(private readonly repo: CandidateRepository) {}

  async execute(dto: CreateCandidateDto): Promise<CandidateDomain> {
    const candidate = new CandidateDomain(
      randomUUID(),
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phone,
      dto.observations,
      dto.status ?? CandidateStatusDomain.PENDING,
    );
    return this.repo.create(candidate);
  }
}
