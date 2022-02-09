import { MeetingModifiedEvent } from '../../DomainEvents/MeetingEvents/MeetingModifed.event';
import { Meeting } from '../../AggRoots/Meeting/Meeting';
import { MeetingDateVO } from '../../AggRoots/Meeting/ValueObjects/MeetingDateVO';
import { MeetingDescriptionVO } from '../../AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { MeetingLocationVO } from '../../AggRoots/Meeting/ValueObjects/MeetingLocationVO';
import { MeetingCanceledEvent } from '../../DomainEvents/MeetingEvents/MeetingCanceled.event';
import { MeetingScheduledEvent } from '../../DomainEvents/MeetingEvents/MeetingScheduled.event';
import { exampleEmployer } from '../Employer/employerDomainEvents.spec';
import { create_exampleCandidate } from '../Candidate/eliminateCandidate.spec';

const exampleCandidate = create_exampleCandidate();

const meetingExample = Meeting.ScheduleOn(
  new MeetingDateVO(new Date(2022, 11, 31)),
  exampleEmployer,
  exampleCandidate,
  new MeetingDescriptionVO('Meeting test description'),
  new MeetingLocationVO(20, 90),
);

describe('Agendar una reunion', () => {
  it('Se debe crear una entidad meeting con la informacion asignada con un estado activivo', () => {
    expect(meetingExample.GetChanges()[0]).toBeInstanceOf(
      MeetingScheduledEvent,
    );
  });
});

describe('Modificar una reunion', () => {
  it('Debe cambiar todos los valores posibles', () => {
    meetingExample.Modified(
      new MeetingDescriptionVO('Meeting description modify'),
      new MeetingLocationVO(20, 90),
    );
    expect(meetingExample.GetChanges()[0]).toBeInstanceOf(
      MeetingScheduledEvent,
    );
    expect(meetingExample.GetChanges()[1]).toBeInstanceOf(MeetingModifiedEvent);
  });
});

describe('Cancelar una reunion', () => {
  it('Debe cambiar el estado de la reunion a Cancel', () => {
    meetingExample.Cancel();
    expect(meetingExample.GetChanges()[0]).toBeInstanceOf(
      MeetingScheduledEvent,
    );
    expect(meetingExample.GetChanges()[1]).toBeInstanceOf(MeetingModifiedEvent);
    expect(meetingExample.GetChanges()[2]).toBeInstanceOf(MeetingCanceledEvent);
  });
});
