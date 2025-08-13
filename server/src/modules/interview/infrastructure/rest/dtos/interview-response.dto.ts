import { InterviewDomain } from 'src/modules/interview/domain/entities/interview.entity';

export class InterviewResponseDto {
  id: string;
  candidateId: string;
  position: string;
  scheduledAt: Date;

  constructor(domain: InterviewDomain) {
    this.id = domain.id;
    this.candidateId = domain.candidateId;
    this.position = domain.position;
    this.scheduledAt = domain.scheduledAt;
  }
}
