import { http } from './http'

export interface CandidateDTO {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  observations?: string | null
  status: 'PENDING' | 'INTERVIEW' | 'REJECTED' | 'HIRED'
}

export type CandidateFilters = {
  name?: string
  email?: string
}

export type CreateCandidatePayload = {
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  observations?: string | null
  status?: string
}

export type UpdateCandidatePayload = Partial<CreateCandidatePayload>

// GET /candidates?name=&email=
export async function getCandidates(filters: CandidateFilters = {}): Promise<CandidateDTO[]> {
  const { data } = await http.get<CandidateDTO[]>('/candidates', { params: filters })
  return data
}

// GET /candidates/:id
export async function getCandidateById(id: string): Promise<CandidateDTO> {
  const { data } = await http.get<CandidateDTO>(`/candidates/${id}`)
  return data
}

// POST /candidates
export async function createCandidate(payload: CreateCandidatePayload): Promise<CandidateDTO> {
  const { data } = await http.post<CandidateDTO>('/candidates', payload)
  return data
}

// PATCH /candidates/:id
export async function updateCandidate(id: string, payload: UpdateCandidatePayload): Promise<CandidateDTO> {
  const { data } = await http.patch<CandidateDTO>(`/candidates/${id}`, payload)
  return data
}

// DELETE /candidates/:id
export async function deleteCandidate(id: string): Promise<void> {
  await http.delete(`/candidates/${id}`)
}