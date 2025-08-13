import {
  CandidateDomain,
  CandidateStatusDomain,
} from '../entities/candidate.entity';

export abstract class CandidateRepository {
  abstract create(candidate: CandidateDomain): Promise<CandidateDomain>;

  abstract findAll(filters?: {
    name?: string;
    email?: string;
  }): Promise<CandidateDomain[]>;

  abstract findById(id: string): Promise<CandidateDomain | null>;

  abstract update(
    id: string,
    data: UpdateCandidateData,
  ): Promise<CandidateDomain | null>;

  abstract delete(id: string): Promise<void>;
}

export type UpdateCandidateData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  observations?: string;
  status?: CandidateStatusDomain;
};
