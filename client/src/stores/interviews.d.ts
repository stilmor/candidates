import type { Interview } from '@/api/types';
export declare const useInterviewsStore: import("pinia").StoreDefinition<"interviews", {
    byCandidate: Map<string, Interview[]>;
    loading: boolean;
    error: string | null;
    lastCreated: Interview | null;
}, {}, {
    fetchForCandidate(candidateId: string): Promise<void>;
    createInterview(payload: {
        candidateId: string;
        position: string;
        scheduledAt: string;
    }): Promise<void>;
}>;
