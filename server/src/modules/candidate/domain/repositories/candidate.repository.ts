import { CandidateDomain } from '../entities/candidate.entity';

export abstract class CandidateRepository {
  abstract create(candidate: CandidateDomain): Promise<CandidateDomain>;
}
