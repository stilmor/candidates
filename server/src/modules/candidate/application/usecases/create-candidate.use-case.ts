import { Injectable } from '@nestjs/common';
import { Candidate } from '../../domain/entities/candidate.entity';
import { CandidateRepository } from '../../domain/repositories/candidate.repository';
import { CreateCandidateDto } from '../dtos/create-candidate-dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateCandidateUseCase {
  constructor(private readonly candidateRepo: CandidateRepository) {}

  async execute(dto: CreateCandidateDto): Promise<void> {
    const candidate = new Candidate(
      randomUUID(),
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.phone,
      dto.observations,
    );

    await this.candidateRepo.create(candidate);
  }
}
