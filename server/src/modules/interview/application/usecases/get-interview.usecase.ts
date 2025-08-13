import { Injectable } from '@nestjs/common';
import { InterviewRepository } from '../../domain/repositories/interview.repository';
import { InterviewDomain } from '../../domain/entities/interview.entity';

@Injectable()
export class GetInterviewUseCase {
  constructor(private readonly repo: InterviewRepository) {}

  async execute(id: string): Promise<InterviewDomain | null> {
    return this.repo.findById(id);
  }
}
