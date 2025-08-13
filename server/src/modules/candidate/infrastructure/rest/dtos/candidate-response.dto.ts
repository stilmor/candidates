import { CandidateDomain } from '../../../domain/entities/candidate.entity';

export class CandidateResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  observations?: string;
  status: string;

  constructor(domain: CandidateDomain) {
    this.id = domain.id;
    this.firstName = domain.firstName;
    this.lastName = domain.lastName;
    this.email = domain.email;
    this.phone = domain.phone;
    this.observations = domain.observations;
    this.status = domain.status;
  }
}
