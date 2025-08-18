import { http } from './http';

export interface InterviewDTO {
  id: string;
  candidateId: string;
  position: string;
  scheduledAt: string;
}

export async function getInterviewsByCandidate(candidateId: string) {
  const { data } = await http.get<InterviewDTO[]>(`/interviews/candidate/${candidateId}`);
  return data;
}

export async function createInterview(payload: { candidateId: string; position: string; scheduledAt: string }): Promise<InterviewDTO> {
  const body = {
    ...payload,
    scheduledAt: new Date(payload.scheduledAt).toISOString(),
  };
  const { data } = await http.post<InterviewDTO>(`/interviews`, body);
  return data;
}