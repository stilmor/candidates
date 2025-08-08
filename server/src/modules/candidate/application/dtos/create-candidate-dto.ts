// src/modules/candidate/dto/create-candidate.dto.ts

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';
import { CandidateStatus } from '@prisma/client';

export class CreateCandidateDto {
  @ApiProperty({
    example: 'Alice',
    description: 'First name of the candidate',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Smith',
    description: 'Last name of the candidate',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'alice.smith@example.com',
    description: 'Unique email address',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: '+34123456789',
    description: 'Optional phone number',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'Candidate speaks three languages fluently',
    description: 'Additional observations or notes',
  })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiPropertyOptional({
    example: CandidateStatus.INTERVIEW,
    enum: CandidateStatus,
    description: 'Current status of the candidate',
  })
  @IsOptional()
  @IsEnum(CandidateStatus)
  status?: CandidateStatus;
}
