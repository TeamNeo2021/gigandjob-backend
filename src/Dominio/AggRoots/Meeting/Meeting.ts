import { AggregateRoot } from '../AggregateRoot';
import { MeetingIDVO } from './ValueObjects/MeetingIDVO';
import { MeetingLocationVO } from './ValueObjects/MeetingLocationVO';
import { MeetingStates, MeetingStateVO } from './ValueObjects/MeetingStateVO';
import { MeetingDescriptionVO } from './ValueObjects/MeetingDescriptionVO';
import { MeetingDateVO } from './ValueObjects/MeetingDateVO';
import { MeetingCanceledEvent } from '../../DomainEvents/MeetingEvents/MeetingCanceled.event';
import { MeetingScheduledEvent } from '../../DomainEvents/MeetingEvents/MeetingScheduled.event';
import { IDomainEvent } from '../../DomainEvents/IDomainEvent';
import { InvalidMeetingDate } from './Errors/InvalidMeetingDate.error';
import { MeetingModifiedEvent } from '../../DomainEvents/MeetingEvents/MeetingModifed.event';
import { Candidate } from '../Candidate/Candidate';
import { Employer } from '../Employer/Employer';
import { MeetingAccepted } from 'src/Dominio/DomainEvents/MeetingEvents/MeetingAccepted.event';
import { MeetingRejected } from 'src/Dominio/DomainEvents/MeetingEvents/MeetingRejected.event';

export class Meeting extends AggregateRoot {
  private _candidate: Candidate;
  private _employer: Employer;
  private _id: MeetingIDVO;
  private _state: MeetingStateVO;
  private _description: MeetingDescriptionVO;
  private _date: MeetingDateVO;
  private _location: MeetingLocationVO;

  constructor(
    id: MeetingIDVO,
    state: MeetingStateVO,
    description: MeetingDescriptionVO,
    date: MeetingDateVO,
    location: MeetingLocationVO,
    employerID: Employer,
    candidateID: Candidate,
  ) {
    super();
    this._id = id;
    this._state = state;
    this._description = description;
    this._date = date;
    this._location = location;
    this._employer = employerID;
    this._candidate = candidateID;
  }

  protected When(event: IDomainEvent): void {
    switch (event.constructor) {
      case MeetingCanceledEvent:
        const today = new MeetingDateVO(new Date());
        if (!today.LessThan(this.date)) {
          throw InvalidMeetingDate.MeetingDateExpired();
        }
        break;

      case MeetingScheduledEvent:
        break;

      case MeetingModifiedEvent:
        break;
      case MeetingAccepted:
        this.state = new MeetingStateVO(MeetingStates.Active);
        break;
    }
  }

  protected EnsureValidState(): void {
    const valid =
      this._id != null &&
      this._date != null &&
      this._location != null &&
      this._description != null &&
      this.candidate != null &&
      this.employer != null &&
      this._description.value != '' &&
      this._description.value.length < 250;
    switch (this.state.current) {
      case MeetingStates.Active:
        if (
          this._id == null ||
          this._date == null ||
          this.date.value < new Date(Date.now()) ||
          this._location == null ||
          this._description == null ||
          this.candidate == null ||
          this.employer == null
        ) {
          throw new Error('Invalid Active State');
        }
        break;
      case MeetingStates.Suspended:
        if (
          this._id == null ||
          this._date == null ||
          this._location == null ||
          this._description == null ||
          this.candidate == null ||
          this.employer == null
        ) {
          throw new Error('Invalid Suspended State');
        }
      default:
        break;
    }

    if (!valid) {
      throw new Error('Invalid State');
    }
  }

  // methods
  public Cancel() {
    console.log('Cancel meeting');
    this.state = new MeetingStateVO(MeetingStates.Canceled);
    this.Apply(new MeetingCanceledEvent());
    return this;
  }

  static ScheduleOn(
    date: MeetingDateVO,
    employer: Employer,
    candidate: Candidate,
    description: MeetingDescriptionVO,
    location: MeetingLocationVO,
    state: MeetingStateVO = new MeetingStateVO(MeetingStates.Pending),
  ) {
    console.log('Schedule on meeting');
    const id = new MeetingIDVO();
    const meeting = new Meeting(
      id,
      state,
      description,
      date,
      location,
      employer,
      candidate,
    );
    meeting.Apply(new MeetingScheduledEvent());
    return meeting;
  }

  public Modified(
    description?: MeetingDescriptionVO,
    location?: MeetingLocationVO,
    date?: MeetingDateVO,
  ) {
    if (description) {
      this.description = description;
    }
    if (location) {
      this.location = location;
    }
    if (date) {
      this.date = date;
    }
    this.Apply(new MeetingModifiedEvent());
  }

  public Accept() {
    console.log('Accept meeting');
    this.Apply(new MeetingAccepted(this.id.id, this.candidate.id));
    return this;
  }

  public Reject() {
    console.log('Reject meeting');
    this.Apply(new MeetingRejected(this.id.id, this.candidate.id));
    return this;
  }

  // getters y setters
  get id(): MeetingIDVO {
    return this._id;
  }

  get state(): MeetingStateVO {
    return this._state;
  }

  get description(): MeetingDescriptionVO {
    return this._description;
  }

  get date(): MeetingDateVO {
    return this._date;
  }

  get location(): MeetingLocationVO {
    return this._location;
  }

  get candidate(): Candidate {
    return this._candidate;
  }

  get employer(): Employer {
    return this._employer;
  }

  private set state(state: MeetingStateVO) {
    this._state = state;
  }

  private set date(date: MeetingDateVO) {
    this._date = date;
  }

  private set location(location: MeetingLocationVO) {
    this._location = location;
  }

  private set description(description: MeetingDescriptionVO) {
    this._description = description;
  }

  private set employer(employer: Employer) {
    this._employer = employer;
  }

  private set candidate(candidate: Candidate) {
    this._candidate = candidate;
  }
}
