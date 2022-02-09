import { MeetingDescriptionVO } from '../../AggRoots/Meeting/ValueObjects/MeetingDescriptionVO';
import { InvalidMeetingDescriptionError } from '../../AggRoots/Meeting/Errors/InvalidMeetingDescription.error';

describe('Meeting description', () => {
  it('should not create when description is empty', () => {
    expect(() => new MeetingDescriptionVO('')).toThrowError(
      InvalidMeetingDescriptionError,
    );
  });
  it('should not create when description is null', () => {
    expect(() => new MeetingDescriptionVO(null)).toThrowError(
      InvalidMeetingDescriptionError,
    );
  });
  it('should not create when description has more than 250 characters', () => {
    const description = new Array(250).fill('a').join('');
    expect(() => new MeetingDescriptionVO(description)).toThrowError(
      InvalidMeetingDescriptionError,
    );
  });
  it('should create when description is valid', () => {
    expect(new MeetingDescriptionVO('Some valid description')).toBeInstanceOf(
      MeetingDescriptionVO,
    );
  });
});
