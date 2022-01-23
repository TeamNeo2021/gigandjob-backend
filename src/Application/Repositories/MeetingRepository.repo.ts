
export interface IMeetingRepository {

      repository;

    scheduleMeeting(meeting: MeetingDTO): MeetingDTO;

    cancelMeeting(id: String);

    modifyMeeting(meeting: ModifyMeetingDTO): MeetingDTO;

    getAllCandidateMeetings(candidateId: String): Array<MeetingDTO>;

    getAllEmployerMeetings(employerId: String): Array<MeetingDTO>;

    cancelAllEmployerMeetings(employerId: String);

    cancelAllCandidateMeetings(candidateId: String);

}