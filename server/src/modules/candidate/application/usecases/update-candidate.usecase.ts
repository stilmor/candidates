// server/src/modules/candidate/application/usecases/update-candidate.usecase.ts
import { Injectable } from '@nestjs/common';
import {
  CandidateRepository,
  UpdateCandidateData,
} from '../../domain/repositories/candidate.repository';
import { CandidateDomain } from '../../domain/entities/candidate.entity';
import { UpdateCandidateDto } from '../dtos/update-candidate-dto';

@Injectable()
export class UpdateCandidateUseCase {
  constructor(private readonly repo: CandidateRepository) {}

  async execute(
    id: string,
    dto: UpdateCandidateDto,
  ): Promise<CandidateDomain | null> {
    const data: UpdateCandidateData = this.toUpdateData(dto);
    return this.repo.update(id, data);
  }

  private toUpdateData(dto: UpdateCandidateDto): UpdateCandidateData {
    const { firstName, lastName, email, phone, observations, status } = dto;
    // quita claves con undefined para no sobreescribir con null/undefined en DB
    const entries = Object.entries({
      firstName,
      lastName,
      email,
      phone,
      observations,
      status,
    }).filter(([, v]) => typeof v !== 'undefined');
    return Object.fromEntries(entries) as UpdateCandidateData;
  }
}
