export class CandidateDomain {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone?: string,
    public observations?: string,
    public status: CandidateStatusDomain = CandidateStatusDomain.PENDING,
  ) {}
}

export enum CandidateStatusDomain {
  PENDING = 'PENDING',
  INTERVIEW = 'INTERVIEW',
  REJECTED = 'REJECTED',
  HIRED = 'HIRED',
}
