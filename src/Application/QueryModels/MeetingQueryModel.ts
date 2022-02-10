import { MeetingDTO } from "../DTO/Meeting/Meeting.dto";

export interface MeeetingQueryModel {
    getAll(candidateId: string): Promise<MeetingDTO[]>;
  }