import { Candidate } from '../entities/candidate.entity';

export abstract class CandidateRepository {
  abstract create(candidate: Candidate): Promise<void>;
}
