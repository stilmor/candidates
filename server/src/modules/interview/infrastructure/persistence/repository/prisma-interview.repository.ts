import { Injectable } from '@nestjs/common';
import { InterviewRepository } from '../../../domain/repositories/interview.repository';
import { InterviewDomain } from '../../../domain/entities/interview.entity';
import { PrismaService } from 'src/prisma.service';
import { prismaInterviewToDomain } from '../mappers/interview.mapper';

@Injectable()
export class PrismaInterviewRepository implements InterviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<InterviewDomain | null> {
    const interview = await this.prisma.interview.findUnique({
      where: { id },
    });

    if (!interview) return null;

    return prismaInterviewToDomain(interview);
  }

  async findAll(): Promise<InterviewDomain[]> {
    const interviews = await this.prisma.interview.findMany();
    return interviews.map(prismaInterviewToDomain);
  }

  async create(
    interview: Omit<InterviewDomain, 'id'>,
  ): Promise<InterviewDomain> {
    const created = await this.prisma.interview.create({
      data: {
        candidateId: interview.candidateId,
        position: interview.position,
        scheduledAt: interview.scheduledAt,
      },
    });
    return prismaInterviewToDomain(created);
  }

  async findByCandidate(candidateId: string): Promise<InterviewDomain[]> {
    const rows = await this.prisma.interview.findMany({
      where: { candidateId },
      orderBy: { scheduledAt: 'desc' },
    });
    return rows.map(prismaInterviewToDomain);
  }
}
