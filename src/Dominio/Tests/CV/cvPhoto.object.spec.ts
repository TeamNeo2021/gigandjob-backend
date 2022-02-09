import { EmptyCvPhotoError } from '../../AggRoots/CV/Errors/emptyCvPhoto.error';
import { CvPhoto } from '../../AggRoots/CV/ValueObjects/cvPhoto.object';

describe('Cv photo', () => {
  it('should fail when empty buffer is provided', () => {
    expect(() => new CvPhoto(Buffer.from([]))).toThrowError(EmptyCvPhotoError);
  });
  it('should create when non empty buffer is provided', () => {
    expect(new CvPhoto(Buffer.from([2]))).toBeInstanceOf(CvPhoto);
  });
});
