import { CandidateFullNameVo } from '../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo';
import { EmptyCandidateName } from '../../AggRoots/Candidate/ValueObjects/Errors/emptyCandidateName.error';

describe('register a new Candidate', () => {
  it('should fail when empty name is entered', () => {
    //Validate names are not empty
    expect(() => new CandidateFullNameVo('', '')).toThrowError(
      EmptyCandidateName,
    );
  }),
    it('should succeed when valid names are entered', () => {
      //Validate names are not empty
      expect(() => new CandidateFullNameVo('Jose', 'Moncada'));
    });
});
