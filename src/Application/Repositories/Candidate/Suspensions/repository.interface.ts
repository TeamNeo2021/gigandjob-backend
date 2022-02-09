export interface CandidateSuspensionRespository {
  getSuspensionCount(id: string): Promise<number>;
}
