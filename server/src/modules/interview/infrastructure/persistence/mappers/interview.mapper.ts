import { Interview as PrismaInterview } from '@prisma/client';
import { InterviewDomain } from '../../../domain/entities/interview.entity';

export function prismaInterviewToDomain(
  interview: PrismaInterview,
): InterviewDomain {
  return new InterviewDomain(
    interview.id,
    interview.candidateId,
    interview.position,
    interview.scheduledAt,
  );
}

export function domainInterviewToPrisma(
  interview: InterviewDomain,
): PrismaInterview {
  return {
    id: interview.id,
    candidateId: interview.candidateId,
    position: interview.position,
    scheduledAt: interview.scheduledAt,
  } as PrismaInterview;
}
