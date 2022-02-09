import { CandidatePhoneVo } from '../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo';
import { InvalidCandidatePhoneNumber } from '../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidatePhoneNumber.error';

describe('create a new Candidate Phone Number', () => {
  //validate Phone Number
  it('should fail when an empty phone number is entered', () => {
    expect(() => new CandidatePhoneVo('0414', '')).toThrowError(
      InvalidCandidatePhoneNumber,
    );
  }),
    it('should fail if phone lenght is shorter', () => {
      expect(() => new CandidatePhoneVo('0414', '123456')).toThrowError(
        InvalidCandidatePhoneNumber,
      );
    }),
    it('should fail if phone lenght is longer', () => {
      expect(() => new CandidatePhoneVo('0414', '12345678')).toThrowError(
        InvalidCandidatePhoneNumber,
      );
    }),
    it('should fail if area code is empty', () => {
      expect(() => new CandidatePhoneVo('', '12345678')).toThrowError(
        InvalidCandidatePhoneNumber,
      );
    }),
    it('should fail if area code is not in the list', () => {
      expect(() => new CandidatePhoneVo('198', '12345678')).toThrowError(
        InvalidCandidatePhoneNumber,
      );
    }),
    it('should fail when an empty phone number is entered', () => {
      expect(() => new CandidatePhoneVo('', '')).toThrowError(
        InvalidCandidatePhoneNumber,
      );
    }),
    it('should succeed when a valid phone number is entered', () => {
      expect(() => new CandidatePhoneVo('0414', '4407938')); //caso exito
    });
});
