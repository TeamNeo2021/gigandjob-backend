import { randomUUID } from "crypto";
import { InvalidEmployerId } from "../Errors/InvalidEmployerId.error";

const UUID_FORMAT =
    /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g

export class EmployerIdVO {
  guid_value: string;

  public get _guid_value(): string {
    return this.guid_value;
}

  constructor(_guid_value: string = randomUUID()) {
    if (!_guid_value || _guid_value.trim() == "") 
    throw InvalidEmployerId.EmptyId(); 
    if (!_guid_value.match(UUID_FORMAT) || _guid_value.match(UUID_FORMAT).length == 0) 
    throw InvalidEmployerId.InvalidFormatId(_guid_value);  
    this.guid_value = _guid_value

  }
}
