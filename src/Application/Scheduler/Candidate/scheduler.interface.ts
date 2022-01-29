export interface CandidateScheduler {
    scheduleCandidateReactivation(id: string, at: Date): Promise<void>
}