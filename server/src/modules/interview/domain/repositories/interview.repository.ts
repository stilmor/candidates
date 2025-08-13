import { InterviewDomain } from '../entities/interview.entity';

export abstract class InterviewRepository {
  abstract create(interview: InterviewDomain): Promise<InterviewDomain>;
  abstract findById(id: string): Promise<InterviewDomain | null>;
  abstract findAll(): Promise<InterviewDomain[]>;
  // abstract update(interview: InterviewDomain): Promise<void>;
  // abstract delete(id: string): Promise<void>;
}
