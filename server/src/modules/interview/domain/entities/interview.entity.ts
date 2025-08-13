export class InterviewDomain {
  constructor(
    public readonly id: string,
    public readonly candidateId: string,
    public position: string,
    public scheduledAt: Date,
  ) {}
}
