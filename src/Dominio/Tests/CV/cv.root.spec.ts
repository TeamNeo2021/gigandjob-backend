import { randomUUID } from 'crypto';
import { Cv } from '../../AggRoots/CV/cv.root';
import { CvCandidate } from '../../AggRoots/CV/ValueObjects/cvCandidate.object';
import { CvDescription } from '../../AggRoots/CV/ValueObjects/cvDescription.object';
import { CvPhoto } from '../../AggRoots/CV/ValueObjects/cvPhoto.object';
import { CvStudies } from '../../AggRoots/CV/ValueObjects/cvStudies.object';
import { CvWorkExperience } from '../../AggRoots/CV/ValueObjects/cvWorkExperience.object';
import { CvApprovedDomainEvent } from '../../DomainEvents/CvEvents/cvApproved.event';
import { CvRejectedDomainEvent } from '../../DomainEvents/CvEvents/cvRejected.event';
import { CvSubmittedDomainEvent } from '../../DomainEvents/CvEvents/cvSubmitted.event';

const dummyCv = () =>
  Cv.submitCv(
    new CvDescription('Some valid description'),
    [
      new CvWorkExperience(
        'As a developer',
        new Date(Date.now() - 5 * 1000 * 60 * 60 * 24 * 365),
        new Date(Date.now() - 4 * 1000 * 60 * 60 * 24 * 365),
        'UCAB',
      ),
    ],
    [
      new CvStudies(
        'Pregrade',
        new Date(Date.now() - 2 * 1000 * 60 * 60 * 24 * 365),
        new Date(Date.now() - 1 * 1000 * 60 * 60 * 24 * 365),
        'UCAB',
        'Engineer',
      ),
    ],
    new CvPhoto(Buffer.from([2])),
    new CvCandidate(
      randomUUID(),
      new Date(Date.now() - 21 * 1000 * 60 * 60 * 24 * 365),
    ),
  );

const badCv = () =>
  Cv.submitCv(
    new CvDescription('Some valid description'),
    [
      new CvWorkExperience(
        'As a developer',
        new Date(Date.now() - 5 * 1000 * 60 * 60 * 24 * 365),
        new Date(Date.now() - 4 * 1000 * 60 * 60 * 24 * 365),
        'UCAB',
      ),
    ],
    [
      new CvStudies(
        'Pregrade',
        new Date(Date.now() - 2 * 1000 * 60 * 60 * 24 * 365),
        new Date(Date.now() - 1 * 1000 * 60 * 60 * 24 * 365),
        'UCAB',
        'Engineer',
      ),
    ],
    new CvPhoto(Buffer.from([2])),
    new CvCandidate(randomUUID(), new Date(Date.now() - 1000)),
  );

describe('CV', () => {
  it('should submit and save the event', () => {
    const cv = dummyCv();
    expect(cv.GetChanges()[0]).toBeInstanceOf(CvSubmittedDomainEvent);
  });
  it('should reject and save the event', () => {
    const cv = dummyCv().reject();

    expect(cv.GetChanges()[0]).toBeInstanceOf(CvSubmittedDomainEvent);
    expect(cv.GetChanges()[1]).toBeInstanceOf(CvRejectedDomainEvent);
  });
  it('should approve and save the event', () => {
    const cv = dummyCv().approve();

    expect(cv.GetChanges()[0]).toBeInstanceOf(CvSubmittedDomainEvent);
    expect(cv.GetChanges()[1]).toBeInstanceOf(CvApprovedDomainEvent);
  });
  it("should not submit if candidate birthdate is after it's studies or work experience", () => {
    expect(badCv).toThrowError();
  });

  // Compile-time Testing
  // Uncomment these for compilation errors, the compilation errors ensure some actions
  // cannot be done, for example, approving a rejected CV

  // A rejected offer cannot be approved
  // let cv = dummyCv().reject()
  // cv.approve()

  // A rejected offer cannot be rejected again
  // let cv = dummyCv().reject()
  // cv.reject()

  // An approved offer cannot be rejected
  // let cv = dummyCv().approve()
  // cv.reject()

  // An approved offer cannot be approved again
  // let cv = dummyCv().approve()
  // cv.approve()
});
