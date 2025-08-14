export type Candidate = {
  id: string; firstName: string; lastName: string; email: string;
  phone?: string; observations?: string; status: string;
}
export type Interview = {
  id: string; candidateId: string; position: string; scheduledAt: string;
}