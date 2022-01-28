
export interface IMeetingRepository {

      repository;

    /**Creates new meeting
     * @returns Promise<MeetingDTO> 
     * @param MeetingDTO*/  
    saveMeeting(meeting: MeetingDTO)/**: Promise<MeetingDTO> */;

     /**Creates new meeting
     * @returns void
     * @param meetingId */ 
    cancelMeeting(meetingId: String);

   /**modifies a meeting
    * @param ModifyMeetingDTO
     * @returns Promise<MeetingDTO> */ 
    modifyMeeting(meeting: ModifyMeetingDTO) /**: Promise<MeetingDTO> */;

 /**returns all the meetings for an specific candidate
     * @returns Promise<Array<MeetingDTO>>
     * @param candidateId */ 
    getAllCandidateMeetings(candidateId: String): Promise<Array<MeetingDTO>>;

 /**returns all the meetings for an specific candidate
     * @returns Promise<Array<MeetingDTO>>
     * @param candidateId */ 
    getAllEmployerMeetings(employerId: String): Promise<Array<MeetingDTO>>;

     /**cancel all the meetings for an specific employer
     * @returns void
     * @param employerId */ 
    cancelAllEmployerMeetings(employerId: String);

     /**cancel all the meetings for an specific candidate
     * @returns void
     * @param candidateId */ 
    cancelAllCandidateMeetings(candidateId: String);

}