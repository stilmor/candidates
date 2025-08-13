import { Injectable, NotFoundException } from '@nestjs/common';
import { CandidateRepository } from '../../domain/repositories/candidate.repository';

@Injectable()
export class DeleteCandidateUseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async execute(id: string): Promise<void> {
    const candidate = await this.candidateRepository.findById(id);
    if (!candidate) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    await this.candidateRepository.delete(id);
  }
}
