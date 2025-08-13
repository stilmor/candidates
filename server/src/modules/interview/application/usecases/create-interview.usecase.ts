import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateInterviewDto } from '../dtos/create-interview-dto';
import { InterviewDomain } from '../../domain/entities/interview.entity';
import { randomUUID } from 'crypto';
import { CandidateRepository } from 'src/modules/candidate/domain/repositories/candidate.repository';
import { InterviewRepository } from '../../domain/repositories/interview.repository';

@Injectable()
export class CreateInterviewUseCase {
  constructor(
    private readonly interviewRepository: InterviewRepository,
    private readonly candidateRepository: CandidateRepository,
  ) {}

  async execute(dto: CreateInterviewDto): Promise<InterviewDomain> {
    const date = new Date(dto.scheduledAt);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    const candidate = await this.candidateRepository.findById(dto.candidateId);
    if (!candidate) {
      throw new BadRequestException('Invalid candidate ID');
    }

    const interview = new InterviewDomain(
      randomUUID(),
      dto.candidateId,
      dto.position,
      new Date(dto.scheduledAt),
    );

    await this.interviewRepository.create(interview);
    return interview;
  }
}
