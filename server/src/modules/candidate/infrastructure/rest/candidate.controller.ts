// create-candidate.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
// 1) traemos el tipo generado por Prisma
import { CreateCandidateUseCase } from '../../application/usecases/create-candidate.use-case';
import { CreateCandidateDto } from '../../application/dtos/create-candidate-dto';
import { CandidateDomain } from '../../domain/entities/candidate.entity';
@ApiTags('candidates')
@Controller('candidates')
export class CreateCandidateController {
  constructor(
    private readonly createCandidateUseCase: CreateCandidateUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new candidate' })
  @ApiCreatedResponse({
    description: 'Candidate created successfully',
    // 3) referenciamos el esquema de Prisma.generated
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async execute(@Body() dto: CreateCandidateDto): Promise<CandidateDomain> {
    // 4) devolvemos el tipo Prisma
    return this.createCandidateUseCase.execute(dto);
  }
}
