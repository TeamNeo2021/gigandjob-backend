import { InvalidCandidateAction } from '../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateAction.error';
import { Candidate } from '../../AggRoots/Candidate/Candidate';
import { CandidateBirthDateVo } from '../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo';
import { CandidateEmailVo } from '../../AggRoots/Candidate/ValueObjects/CandidateEmailVo';
import { CandidateFullNameVo } from '../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo';
import { CandidateIdVo } from '../../AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { CandidateLocationVo } from '../../AggRoots/Candidate/ValueObjects/CandidateLocationVO';
import { CandidatePhoneVo } from '../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo';
import {
  CandidateStatesEnum,
  CandidateStateVo,
} from '../../AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { CandidateStateModified } from '../../DomainEvents/CandidateEvents/CandidateStateModified';

export function create_exampleCandidate(): Candidate {
  const exampleCandidate = new Candidate(
    new CandidateIdVo(),
    new CandidateStateVo(CandidateStatesEnum.Active),
    new CandidateFullNameVo('Peter', 'Parker'),
    new CandidatePhoneVo('0414', '4407938'),
    new CandidateEmailVo('spidey@gmail.com'),
    new CandidateBirthDateVo(new Date('2000-01-16')),
    new CandidateLocationVo(20, 90),
  );
  exampleCandidate.registerCandidate();

  return exampleCandidate;
}

describe('Eliminating a candidate', () => {
  it('Should succeed when the method is called', () => {
    const actualCandidate = create_exampleCandidate();
    expect(() => {
      actualCandidate.eliminateThisCandidate();
    }).not.toThrow(Error);
  });
  it('Should add event CandidateStateModified to changes', () => {
    const actualCandidate = create_exampleCandidate();
    actualCandidate.eliminateThisCandidate();
    const events = actualCandidate.GetChanges();
    const last = events.length - 1;
    expect(events[last]).toBeInstanceOf(CandidateStateModified);
  });
  it('Should add CandidateStateModified with state "eliminated" to changes', () => {
    const actualCandidate = create_exampleCandidate();
    actualCandidate.eliminateThisCandidate();
    const events = actualCandidate.GetChanges();
    const last = events.length - 1;
    const last_event: CandidateStateModified = events[
      last
    ] as CandidateStateModified;
    expect(last_event.new_current).toEqual('Eliminated');
  });
  it('candidate should have state: Eliminated', () => {
    const actualCandidate = create_exampleCandidate();
    actualCandidate.eliminateThisCandidate();
    expect(actualCandidate.state).toEqual(
      new CandidateStateVo(CandidateStatesEnum.Eliminated),
    );
  });

  it('Should fail when eliminating twice a candidate', () => {
    expect(() => {
      const actualCandidate = create_exampleCandidate();
      actualCandidate.eliminateThisCandidate(); //frst elimination
      actualCandidate.eliminateThisCandidate(); //scnd elimination
    }).toThrowError(InvalidCandidateAction);
  });
});
