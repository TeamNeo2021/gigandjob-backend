

import { IMeetingRepository } from '../../Application/Repositories/MeetingRepository.repo';


//@Injectable()
export class MeeetingFirestoreRepository implements IMeetingRepository {

    repository :any;
    
    constructor(repository: any){
        this.repository = repository;
    };

    scheduleMeeting(meeting: MeetingDTO): MeetingDTO {
        throw new Error("Method not implemented.");
    }
    cancelMeeting(id: String) {
        throw new Error("Method not implemented.");
    }
    modifyMeeting(meeting: ModifyMeetingDTO): MeetingDTO {
        throw new Error("Method not implemented.");
    }
    getAllCandidateMeetings(candidateId: String): MeetingDTO[] {
        throw new Error("Method not implemented.");
    }
    getAllEmployerMeetings(employerId: String): MeetingDTO[] {
        throw new Error("Method not implemented.");
    }
    cancelAllEmployerMeetings(employerId: String) {
        throw new Error("Method not implemented.");
    }
    cancelAllCandidateMeetings(candidateId: String) {
        throw new Error("Method not implemented.");
    }

}