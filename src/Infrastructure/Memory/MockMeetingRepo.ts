import { MeetingDTO } from 'src/Application/DTO/Meeting/Meeting.dto';
import { ModifyMeetingDTO } from '../../Application/DTO/Meeting/modifyMeetingDTO';
import { Meeting } from 'src/Dominio/AggRoots/Meeting/Meeting';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IMeetingRepository } from '../../Application/Repositories/MeetingRepository.repo';

export class MockMeetingAdapter implements IMeetingRepository {
  public Meetings: MeetingDTO[] = [];

  saveMeeting(meeting: MeetingDTO) {
    this.Meetings.push(meeting);
  }
  cancelMeeting(meetingId: String) {
    throw new Error('Method not implemented.');
  }
  modifyMeeting(meeting: ModifyMeetingDTO) {
    const Tomodify: MeetingDTO = this.Meetings.find((m) => m.id == meeting.id);
    const indextomodify: number = this.Meetings.indexOf(Tomodify);
    this.Meetings[indextomodify].state = meeting.state;
  }

  async getAllCandidateMeetings(candidateId: String): Promise<MeetingDTO[]> {
    return this.Meetings.filter(
      (meeting) => meeting.candidate.candidateId == candidateId,
    );
  }
  getAllEmployerMeetings(employerId: String): Promise<MeetingDTO[]> {
    throw new Error('Method not implemented.');
  }
  cancelAllEmployerMeetings(employerId: String) {
    throw new Error('Method not implemented.');
  }
  cancelAllCandidateMeetings(candidateId: String) {
    throw new Error('Method not implemented.');
  }
  async getById(id: String): Promise<MeetingDTO> {
    return this.Meetings.find((meeting) => meeting.id == id);
  }
}
