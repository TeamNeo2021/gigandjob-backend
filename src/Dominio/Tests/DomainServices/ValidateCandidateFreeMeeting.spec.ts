import { Candidate } from "../../AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { EmployerIdVO } from "../../AggRoots/Employer/ValueObjects/EmployerIdVO";
import { Meeting } from "../../AggRoots/Meeting/Meeting";
import { MeetingDateVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { MeetingDescriptionVO } from "../../AggRoots/Meeting/ValueObjects/MeetingDescriptionVO";
import { MeetingLocationVO } from "../../AggRoots/Meeting/ValueObjects/MeetingLocationVO";
import { ValidateCandidateFreeMeeting } from "../../DomainService/ValidateCandidateFreeMeeting";

const candidateID = new CandidateIdVo();
const validacion = new ValidateCandidateFreeMeeting();
const date = new Date(2022,11,21);

function create_exampleCandidate(): Candidate{
    
    const exampleCandidate = new Candidate(
        candidateID,
        new CandidateStateVo(CandidateStatesEnum.Active),
        new CandidateFullNameVo('Peter', 'Parker'),
        new CandidatePhoneVo('0414', '4407938'),
        new CandidateEmailVo('spidey@gmail.com'),
        new CandidateBirthDateVo(new Date('2000-01-16')),
        new CandidateLocationVo(20, 90)
    );
    exampleCandidate.registerCandidate();

    return exampleCandidate
}

function example_meetings(candidate: CandidateIdVo): Meeting[]{
    return [
        Meeting.ScheduleOn(
            new MeetingDateVO(new Date(2022,11,20)),
            new EmployerIdVO(),
            candidate,
            new MeetingDescriptionVO('Meeting test description'),
            new MeetingLocationVO('Av. Teherán, Urb. Montalbán. Universidad Católica Andrés Bello.'),
        ),
        Meeting.ScheduleOn(
            new MeetingDateVO(date),
            new EmployerIdVO(),
            candidate,
            new MeetingDescriptionVO('Meeting test description'),
            new MeetingLocationVO('Av. Teherán, Urb. Montalbán. Universidad Católica Andrés Bello.'),
        ),
        Meeting.ScheduleOn(
            new MeetingDateVO(new Date(2022,11,22)),
            new EmployerIdVO(),
            candidate,
            new MeetingDescriptionVO('Meeting test description'),
            new MeetingLocationVO('Av. Teherán, Urb. Montalbán. Universidad Católica Andrés Bello.'),
        )
    ]
}

describe('Valida que un candidato este libre el dia de la reunion',()=>{
    it('La validacion no pasa la prueba',()=>{
        expect(
            validacion.validate(date,create_exampleCandidate(),example_meetings(candidateID))
        ).toBe(false)
    })
    it('La validacion pasa la prueba',()=>{
        expect(
            validacion.validate(new Date(2022,11,27),create_exampleCandidate(),example_meetings(candidateID))
        ).toBe(true)
    })
})