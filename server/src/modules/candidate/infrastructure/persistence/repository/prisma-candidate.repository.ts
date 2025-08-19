import { Injectable } from '@nestjs/common';
import {
  CandidateRepository,
  UpdateCandidateData,
} from '../../../domain/repositories/candidate.repository';
import { CandidateDomain } from '../../../domain/entities/candidate.entity';
import { PrismaService } from 'src/prisma.service';
import { toPrisma, prismaCandidateToDomain } from '../mappers/candidate.mapper';
import { Prisma } from '@prisma/client';

const omitUndefined = <T extends Record<string, unknown>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

const isPrismaNotFound = (
  e: unknown,
): e is Prisma.PrismaClientKnownRequestError =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025';

@Injectable()
export class PrismaCandidateRepository implements CandidateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string): Promise<void> {
    await this.prisma.candidate.delete({
      where: { id },
    });
  }

  async update(
    id: string,
    data: UpdateCandidateData,
  ): Promise<CandidateDomain | null> {
    const { status, ...rest } = data;

    const base = omitUndefined(rest) as Prisma.CandidateUpdateInput;

    const updateData: Prisma.CandidateUpdateInput = {
      ...base,
      ...(status !== undefined ? { status: toPrisma(status) } : {}),
    };

    try {
      const updated = await this.prisma.candidate.update({
        where: { id },
        data: updateData,
      });
      return prismaCandidateToDomain(updated);
    } catch (e: unknown) {
      if (isPrismaNotFound(e)) return null;
      throw e;
    }
  }

  async findById(id: string): Promise<CandidateDomain | null> {
    const candidate = await this.prisma.candidate.findUnique({
      where: { id },
    });

    if (!candidate) {
      return null;
    }

    return prismaCandidateToDomain(candidate);
  }

  async findAll(filters?: {
    name?: string;
    email?: string;
  }): Promise<CandidateDomain[]> {
    const where: Prisma.CandidateWhereInput = {
      ...(filters?.name && {
        OR: [
          { firstName: { contains: filters.name, mode: 'insensitive' } },
          { lastName: { contains: filters.name, mode: 'insensitive' } },
        ],
      }),
      ...(filters?.email && {
        email: { contains: filters.email, mode: 'insensitive' },
      }),
    };

    const candidates = await this.prisma.candidate.findMany({ where });
    return candidates.map(prismaCandidateToDomain);
  }

  async create(candidate: CandidateDomain): Promise<CandidateDomain> {
    const created = await this.prisma.candidate.create({
      data: {
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        email: candidate.email,
        phone: candidate.phone,
        observations: candidate.observations,
        status: toPrisma(candidate.status),
      },
    });
    return prismaCandidateToDomain(created);
  }
}
