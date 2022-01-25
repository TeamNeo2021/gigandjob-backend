/*
export class MeetingIDVO {
     value: string;
  
     constructor(value: string) {
       this.value = value;
  }
}
*/
import { randomUUID } from 'crypto';
import { InvalidMeetingIdError } from '../Errors/InvalidMeetingId.error';

const UUID_FORMAT =
  /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;

export class MeetingIDVO {
  _id: String;

  get id() {
    return this._id;
  }

  constructor(id: String = randomUUID()) {
    if (!id || id.trim() == '') throw new InvalidMeetingIdError(id);
    if (!id.match(UUID_FORMAT) || id.match(UUID_FORMAT).length == 0)
      throw new InvalidMeetingIdError(id);
    this._id = id;
  }
}
