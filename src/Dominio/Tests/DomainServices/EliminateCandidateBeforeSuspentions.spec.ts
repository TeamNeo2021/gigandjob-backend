import { CandidateStateModified } from "../../DomainEvents/CandidateEvents/CandidateStateModified";
import { Candidate } from "../../AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { EliminateCandidateBeforeSuspentions } from "../../DomainService/EliminateCandidateBeforeSuspentions";


function create_exampleCandidate(): Candidate{
    
    const exampleCandidate = new Candidate(
        new CandidateIdVo(),
        new CandidateStateVo(CandidateStatesEnum.Active),
        new CandidateFullNameVo('Peter', 'Parker'),
        new CandidatePhoneVo('0414', '4407938'),
        new CandidateEmailVo('spidey@gmail.com'),
        new CandidateBirthDateVo(new Date('2000-01-16')),
        new CandidateLocationVo(20, 90)
    );
    exampleCandidate.registerCandidate("");

    return exampleCandidate
}

function create_Service(candidate: Candidate): EliminateCandidateBeforeSuspentions{
    
    const service = new EliminateCandidateBeforeSuspentions(candidate)

    return service
}



describe('Eliminate a candidate before x suspentions service', () => {
    it('should succeed after x suspentions of candidate', () => {
        let actualCandidate = create_exampleCandidate();
        let actualService = create_Service(actualCandidate);
        actualCandidate.addObserver(actualService);

        expect(()=>{
            actualCandidate.suspendThisCandidate();// first suspention
            actualCandidate.reactivateThisCandidate();
            
            actualCandidate.suspendThisCandidate();//second suspention
            actualCandidate.reactivateThisCandidate()

            actualCandidate.suspendThisCandidate();//third suspention
            //here the service reacts because he observes actualCandidate
        }).not.toThrow(Error);
    });
    it('should add a CandidateStateModified event to the changes of candidate', () => {
        let actualCandidate = create_exampleCandidate();
        let actualService = create_Service(actualCandidate);
        actualCandidate.addObserver(actualService);
        actualCandidate.suspendThisCandidate();// first suspention
        actualCandidate.reactivateThisCandidate();
            
        actualCandidate.suspendThisCandidate();//second suspention
        actualCandidate.reactivateThisCandidate()

        actualCandidate.suspendThisCandidate();//third suspention
        //here the service reacts because he observes actualCandidate

        let events = actualCandidate.GetChanges();
        let last = events.length-1;
        expect(events[last]).toBeInstanceOf(CandidateStateModified);
    });
    it('should add a CandidateStateModified event to the changes of candidate', () => {
        let actualCandidate = create_exampleCandidate();
        let actualService = create_Service(actualCandidate);
        actualCandidate.addObserver(actualService);
        actualCandidate.suspendThisCandidate();// first suspention
        actualCandidate.reactivateThisCandidate();
            
        actualCandidate.suspendThisCandidate();//second suspention
        actualCandidate.reactivateThisCandidate()

        actualCandidate.suspendThisCandidate();//third suspention
        //here the service reacts because he observes actualCandidate

        let events = actualCandidate.GetChanges();
        let last = events.length-1;
        let last_event: CandidateStateModified = events[last] as CandidateStateModified
        expect(last_event.new_current).toEqual('Eliminated');
    });
    it('candidate should have state: Eliminated', () => {
        let actualCandidate = create_exampleCandidate();
        let actualService = create_Service(actualCandidate);
        actualCandidate.addObserver(actualService);
        actualCandidate.suspendThisCandidate();// first suspention
        actualCandidate.reactivateThisCandidate();
            
        actualCandidate.suspendThisCandidate();//second suspention
        actualCandidate.reactivateThisCandidate()

        actualCandidate.suspendThisCandidate();//third suspention
        //here the service reacts because he observes actualCandidate
        
        expect(actualCandidate.state).toHaveProperty('state', CandidateStatesEnum.Eliminated)
    });
})
