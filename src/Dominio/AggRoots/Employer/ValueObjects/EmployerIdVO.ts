import { randomUUID } from "crypto";

const UUID_FORMAT =
    /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g

export class EmployerIdVO {
  guid_value: string;

  public get _guid_value(): string {
    return this.guid_value;
}

  constructor(_guid_value: string = randomUUID()) {
    if (!_guid_value || _guid_value.trim() == "") 
    throw new Error(`ERROR: El valor del id es nulo  (id: ${_guid_value})`); 
    if (!_guid_value.match(UUID_FORMAT) || _guid_value.match(UUID_FORMAT).length == 0) 
    throw new Error(`ERROR: El valor del id es invalido  (id: ${_guid_value})`);  
    this.guid_value = _guid_value

  }
}
