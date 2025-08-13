import { Injectable } from '@nestjs/common';
import { CandidateRepository } from '../../domain/repositories/candidate.repository';
import { CandidateDomain } from '../../domain/entities/candidate.entity';

@Injectable()
export class GetCandidatesUseCase {
  constructor(private readonly repo: CandidateRepository) {}

  execute(filters?: {
    name?: string;
    email?: string;
  }): Promise<CandidateDomain[]> {
    return this.repo.findAll(filters);
  }

  executeById(id: string): Promise<CandidateDomain | null> {
    return this.repo.findById(id);
  }
}
