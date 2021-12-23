import { MeetingModifyEvent } from "../../DomainEvents/MeetingEvents/MeetingModify.event";
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { EmployerIdVO } from "../../AggRoots/Employer/ValueObjects/EmployerIdVO";
import { Meeting } from "../../AggRoots/Meeting/Meeting";
import { MeetingDateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingDescriptionVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDescriptionVO";
import { MeetingLocationVO } from "../../AggRoots/Meeting/ValueObjects/MeetingLocationVO";
import { MeetingCanceledEvent } from "../../DomainEvents/MeetingEvents/MeetingCanceled.event";
import { MeetingScheduledEvent } from "../../DomainEvents/MeetingEvents/MeetingScheduled.event";

const meetingExample = Meeting.ScheduleOn(
    new MeetingDateVO(new Date(2022,11,31)),
    new EmployerIdVO(),
    new CandidateIdVo(),
    new MeetingDescriptionVO('Meeting test description'),
    new MeetingLocationVO('Av. Teherán, Urb. Montalbán. Universidad Católica Andrés Bello.'),
);

describe("Agedar una reunion", ()=>{
    it('Se debe crear una entidad meeting con la informacion asignada con un estado activivo',()=>{
        expect(meetingExample.GetChanges()[0]).toBeInstanceOf(MeetingScheduledEvent);
    })
});

describe('Modificar una reunion',()=>{
    it('Debe cambiar todos los valores posibles',()=>{
        meetingExample.Modify(
            new MeetingDescriptionVO('Meeting description modify'),
            new MeetingLocationVO('Meeting location modify'),
        );
        expect(meetingExample.GetChanges()[0]).toBeInstanceOf(MeetingScheduledEvent);
        expect(meetingExample.GetChanges()[1]).toBeInstanceOf(MeetingModifyEvent);
    })
})

describe("Cancelar una reunion", ()=>{
    it('Debe cambiar el estado de la reunion a Cancel',()=>{
        meetingExample.Cancel();
        expect(meetingExample.GetChanges()[0]).toBeInstanceOf(MeetingScheduledEvent);
        expect(meetingExample.GetChanges()[1]).toBeInstanceOf(MeetingModifyEvent);
        expect(meetingExample.GetChanges()[2]).toBeInstanceOf(MeetingCanceledEvent);
    })
});


