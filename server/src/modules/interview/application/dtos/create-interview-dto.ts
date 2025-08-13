import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsString, IsUUID } from 'class-validator';

export class CreateInterviewDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  candidateId: string;

  @ApiProperty()
  @IsString()
  position: string;

  @ApiProperty({
    description: 'ISO date-time for when the interview is scheduled',
  })
  @IsISO8601()
  scheduledAt: string; // ISO string; convert to Date in the use case
}
