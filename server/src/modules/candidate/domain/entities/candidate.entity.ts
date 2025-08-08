export class Candidate {
  constructor(
    public readonly id: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone?: string,
    public observations?: string,
  ) {}
}
