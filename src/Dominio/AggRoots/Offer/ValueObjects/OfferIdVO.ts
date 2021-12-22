import { randomUUID } from "crypto";

const UUID_FORMAT =
    /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g

export class OfferIdVO {
    value: string;
  
    public get _value(): string {
        return this.value;
    }

    constructor(_value: string = randomUUID()) {
      if (!_value || _value.trim() == "") 
      throw new Error(`ERROR: La dirección está vacía  (id: ${_value})`); 
      if (!_value.match(UUID_FORMAT) || _value.match(UUID_FORMAT).length == 0) 
      throw new Error(`ERROR: La dirección está vacía  (id: ${_value})`);  
      this.value = _value

    }

  }
