import { randomUUID } from 'crypto';
import { InvalidOfferId } from '../Errors/InvalidOfferId.error';

const UUID_FORMAT =
  /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;

export class OfferIdVO {
  value: string;

  public get _value(): string {
    return this.value;
  }

  constructor(_value: string = randomUUID()) {
    if (!_value || String.prototype.trim.apply(_value, []) == '')
      throw InvalidOfferId.EmptyId();
    if (!_value.match(UUID_FORMAT) || _value.match(UUID_FORMAT).length == 0)
      throw InvalidOfferId.InvalidFormatId(_value);
    this.value = _value;
  }
}
