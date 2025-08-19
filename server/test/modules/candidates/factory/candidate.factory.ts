import { Candidate, CandidateStatus } from '@prisma/client';

export function makeCandidate(overrides: Partial<Candidate> = {}): Candidate {
  return {
    id: overrides.id ?? 'test-id',
    firstName: overrides.firstName ?? 'John',
    lastName: overrides.lastName ?? 'Doe',
    email: overrides.email ?? 'john.doe@test.com',
    phone: overrides.phone ?? null,
    observations: overrides.observations ?? null,
    status: (overrides.status as CandidateStatus) ?? CandidateStatus.PENDING,
  };
}

export type CreateCandidatePayload = Omit<Candidate, 'id'>;

export function makeCreateCandidatePayload(
  overrides: Partial<CreateCandidatePayload> = {},
): CreateCandidatePayload {
  return {
    firstName: overrides.firstName ?? 'John',
    lastName: overrides.lastName ?? 'Doe',
    email: overrides.email ?? 'john.doe@test.com',
    phone: overrides.phone ?? null,
    observations: overrides.observations ?? null,
    status: (overrides.status as CandidateStatus) ?? CandidateStatus.PENDING,
  };
}
