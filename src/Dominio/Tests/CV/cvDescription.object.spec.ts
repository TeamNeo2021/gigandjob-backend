import { InvalidCvDescriptionError } from '../../AggRoots/CV/Errors/invalidCvDescription.error';
import { CvDescription } from '../../AggRoots/CV/ValueObjects/cvDescription.object';

describe('CV Work Experience', () => {
  it('should not create when description is empty', () => {
    expect(() => new CvDescription('')).toThrowError(InvalidCvDescriptionError);
  });
  it('should not create when description has more than 500 characters', () => {
    const description = new Array(500).fill('a').join('');
    expect(() => new CvDescription(description)).toThrowError(
      InvalidCvDescriptionError,
    );
  });
  it('should create when description is valid', () => {
    expect(new CvDescription('Some valid description')).toBeInstanceOf(
      CvDescription,
    );
  });
});
