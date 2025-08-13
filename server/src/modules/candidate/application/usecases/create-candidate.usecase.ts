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
