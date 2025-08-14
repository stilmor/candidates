import type { Candidate } from '@/api/types';
export declare const useCandidatesStore: import("pinia").StoreDefinition<"candidates", {
    list: Candidate[];
    current: Candidate | null;
    loading: boolean;
    error: string | null;
}, {}, {
    fetchAll(params?: {
        name?: string;
        email?: string;
    }): Promise<void>;
    fetchById(id: string): Promise<void>;
}>;
