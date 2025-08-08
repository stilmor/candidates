import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from '../dtos/create-candidate-dto';
import { PrismaService } from 'src/prisma.service';
import { Candidate, CandidateStatus } from '@prisma/client';

@Injectable()
export class CreateCandidateUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(dto: CreateCandidateDto): Promise<Candidate> {
    const created = await this.prisma.candidate.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        observations: dto.observations,
        status: dto.status || CandidateStatus.PENDING, // Default status if not provided
      },
    });
    return created;
  }
}
