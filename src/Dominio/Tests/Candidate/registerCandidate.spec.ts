
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo"
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo"
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO"
import { Candidate } from "../../AggRoots/Candidate/Candidate"
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo"
import { CandidateStatesEnum, CandidateStateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateStateVo"
import { CandidateRegisteredDomainEvent } from "../../DomainEvents/CandidateEvents/CandidateRegistered/CandidateRegistered"
import { InvalidCandidateState } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateState.error"
import { InvalidCandidateAction } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateAction.error"

const succesfullCandidateRegistering = ()=>{


const exampleCandidate = new Candidate(
    new CandidateIdVo(),
    new CandidateStateVo(CandidateStatesEnum.Active),
    new CandidateFullNameVo('Peter', 'Parker'),
    new CandidatePhoneVo('0414', '4407938'),
    new CandidateEmailVo('spidey@gmail.com'),
    new CandidateBirthDateVo(new Date('2000-01-16')),
    new CandidateLocationVo(20, 90)
);

 return exampleCandidate.registerCandidate();

}


const RegisterCandidateWithSuspendedState = ()=>{


    const exampleCandidate = new Candidate(
        new CandidateIdVo(),
        new CandidateStateVo(CandidateStatesEnum.Suspended),
        new CandidateFullNameVo('Steve', 'Rogers'),
        new CandidatePhoneVo('0414', '4407938'),
        new CandidateEmailVo('spidey@gmail.com'),
        new CandidateBirthDateVo(new Date('2000-01-16')),
        new CandidateLocationVo(20, 90)
    );
    
      exampleCandidate.registerCandidate();
    
    }

    
const RegisterCandidateTwice = ()=>{


    const exampleCandidate = new Candidate(
        new CandidateIdVo(),
        new CandidateStateVo(CandidateStatesEnum.Active),
        new CandidateFullNameVo('Loki', 'Odinson'),
        new CandidatePhoneVo('0414', '4407938'),
        new CandidateEmailVo('spidey@gmail.com'),
        new CandidateBirthDateVo(new Date('2000-01-16')),
        new CandidateLocationVo(20, 90)
    );
    
    exampleCandidate.registerCandidate();//register candidate 1st time
    exampleCandidate.registerCandidate();//register candidate 2nd time
    
    }


    /**
     * Unit tests related to Candidate Value Objects and the register of a new Candidate
     * */
describe("register a new Candidate", ()=>{
    
    it("should fail when registering a Candidate with a Suspended State",()=>{
       
        expect(RegisterCandidateWithSuspendedState).toThrowError(InvalidCandidateState);
    }),
    it("should fail when registering Candidate twice",()=>{
       
        expect(RegisterCandidateTwice).toThrowError(InvalidCandidateAction);
    }),
    it("should suceed when registering a valid Candidate",()=>{
        const candidate = succesfullCandidateRegistering();
        expect(candidate.GetChanges()[0]).toBeInstanceOf(CandidateRegisteredDomainEvent);
    })

    
})