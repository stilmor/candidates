import {
  CandidateStatusDomain,
  CandidateDomain,
} from '../../../domain/entities/candidate.entity';
import { CandidateStatus as CandidateStatusPrisma } from '@prisma/client';
import { Candidate as PrismaCandidate } from '@prisma/client';

export const toPrisma = (s: CandidateStatusDomain): CandidateStatusPrisma => {
  switch (s) {
    case CandidateStatusDomain.INTERVIEW:
      return CandidateStatusPrisma.INTERVIEW;
    case CandidateStatusDomain.REJECTED:
      return CandidateStatusPrisma.REJECTED;
    case CandidateStatusDomain.HIRED:
      return CandidateStatusPrisma.HIRED;
    default:
      return CandidateStatusPrisma.PENDING;
  }
};

export const fromPrisma = (
  status: CandidateStatusPrisma,
): CandidateStatusDomain => {
  switch (status) {
    case CandidateStatusPrisma.INTERVIEW:
      return CandidateStatusDomain.INTERVIEW;
    case CandidateStatusPrisma.REJECTED:
      return CandidateStatusDomain.REJECTED;
    case CandidateStatusPrisma.HIRED:
      return CandidateStatusDomain.HIRED;
    default:
      return CandidateStatusDomain.PENDING;
  }
};
export const prismaCandidateToDomain = (
  candidate: PrismaCandidate,
): CandidateDomain => {
  return new CandidateDomain(
    candidate.id,
    candidate.firstName,
    candidate.lastName,
    candidate.email,
    candidate.phone ?? undefined,
    candidate.observations ?? undefined,
    fromPrisma(candidate.status),
  );
};
