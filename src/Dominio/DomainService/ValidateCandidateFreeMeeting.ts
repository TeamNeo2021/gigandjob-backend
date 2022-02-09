import { Candidate } from '../AggRoots/Candidate/Candidate';
import { Meeting } from '../AggRoots/Meeting/Meeting';
import { MeetingDateVO } from '../AggRoots/Meeting/ValueObjects/MeetingDateVO';

export class ValidateCandidateFreeMeeting {
  public validate(
    date: Date,
    candidate: Candidate,
    meetings: Meeting[],
  ): boolean {
    for (const meet of meetings) {
      if (
        meet.candidate === candidate &&
        meet.date.value === new MeetingDateVO(date).value
      ) {
        return false;
      }
    }
    return true;
  }
}
