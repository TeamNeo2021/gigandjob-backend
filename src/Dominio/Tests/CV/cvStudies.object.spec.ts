import { InvalidCVStudiesError } from '../../AggRoots/CV/Errors/invalidCvStudies.error';
import { CvStudies } from '../../AggRoots/CV/ValueObjects/cvStudies.object';

describe('Cv Study', () => {
  it('should not create when description is empty', () => {
    expect(
      () =>
        new CvStudies(
          '',
          new Date(Date.now() - 1000),
          new Date(Date.now() - 500),
          'UCAB',
          'Engineer',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should not create when description is more than 500 characters', () => {
    const description = new Array(502).fill('a').join('');
    expect(
      () =>
        new CvStudies(
          description,
          new Date(Date.now() - 1000),
          new Date(Date.now() - 500),
          'UCAB',
          'Engineer',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should not create when institution is empty', () => {
    expect(
      () =>
        new CvStudies(
          'Some valid description',
          new Date(Date.now() - 1000),
          new Date(Date.now() - 500),
          '',
          'Engineer',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should not create when degree is empty', () => {
    expect(
      () =>
        new CvStudies(
          'Some valid description',
          new Date(Date.now() - 1000),
          new Date(Date.now() - 500),
          'UCAB',
          '',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should not create when study start date is after today', () => {
    expect(
      () =>
        new CvStudies(
          'Some valid description',
          new Date(Date.now() + 5000),
          new Date(Date.now() - 500),
          'UCAB',
          '',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should not create when study finish date is after today', () => {
    expect(
      () =>
        new CvStudies(
          'Some valid description',
          new Date(Date.now() - 3000),
          new Date(Date.now() + 1000),
          'UCAB',
          '',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should not create when study finish date is before start date', () => {
    expect(
      () =>
        new CvStudies(
          'Some valid description',
          new Date(Date.now() - 3000),
          new Date(Date.now() - 5000),
          'UCAB',
          '',
        ),
    ).toThrowError(InvalidCVStudiesError);
  });
  it('should create when all parameters all valid', () => {
    expect(
      new CvStudies(
        'Some valid description',
        new Date(Date.now() - 3000),
        new Date(Date.now() - 2000),
        'UCAB',
        'Engineer',
      ),
    ).toBeInstanceOf(CvStudies);
  });
});
