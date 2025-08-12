// src/modules/candidate/infrastructure/persistence/prisma-candidate.repository.ts
import { Injectable } from '@nestjs/common';
import { CandidateRepository } from '../../../domain/repositories/candidate.repository';
import { CandidateDomain } from '../../../domain/entities/candidate.entity';
import { PrismaService } from 'src/prisma.service';
import { toPrisma, fromPrisma } from '../mappers/candidate.mapper';

@Injectable()
export class PrismaCandidateRepository implements CandidateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(candidate: CandidateDomain): Promise<CandidateDomain> {
    const created = await this.prisma.candidate.create({
      data: {
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        observations: candidate.observations,
        status: toPrisma(candidate.status),
      },
    });
    return new CandidateDomain(
      created.id,
      created.firstName,
      created.lastName,
      created.email,
      created.phone ?? undefined,
      created.observations ?? undefined,
      fromPrisma(created.status),
    );
  }
}
