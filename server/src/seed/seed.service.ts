import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CandidateStatus } from '@prisma/client';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async run() {
    const count = await this.prisma.candidate.count();
    if (count > 0) return;

    await this.prisma.candidate.createMany({
      data: [
        {
          id: crypto.randomUUID(),
          firstName: 'Ada',
          lastName: 'Lovelace',
          email: 'ada@example.com',
          status: CandidateStatus.PENDING,
        },
        {
          id: crypto.randomUUID(),
          firstName: 'Grace',
          lastName: 'Hopper',
          email: 'grace@example.com',
          status: CandidateStatus.INTERVIEW,
        },
        {
          id: crypto.randomUUID(),
          firstName: 'Linus',
          lastName: 'Torvalds',
          email: 'linus@example.com',
          status: CandidateStatus.HIRED,
        },
      ],
    });

    const ada = await this.prisma.candidate.findFirst({
      where: { email: 'ada@example.com' },
    });
    const grace = await this.prisma.candidate.findFirst({
      where: { email: 'grace@example.com' },
    });

    if (ada) {
      await this.prisma.interview.create({
        data: {
          candidateId: ada.id,
          position: 'Backend Dev',
          scheduledAt: new Date(Date.now() + 3600_000),
        },
      });
    }
    if (grace) {
      await this.prisma.interview.create({
        data: {
          candidateId: grace.id,
          position: 'Platform Eng',
          scheduledAt: new Date(Date.now() + 7200_000),
        },
      });
    }

    this.logger.log('Seed data inserted');
  }
}
