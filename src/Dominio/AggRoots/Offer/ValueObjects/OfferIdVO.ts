import { randomUUID } from "crypto";
import { InvalidOfferId } from "../Errors/InvalidOfferId.error";

const UUID_FORMAT =
    /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g

export class OfferIdVO {
    value: string;
  
    public get _value(): string {
        return this.value;
    }

    constructor(value: string = randomUUID()) {
      console.log('Valor de trim: ', value.trim);
      if (!value || String(value).trim() == "") 
      throw InvalidOfferId.EmptyId(); 
      if (!value.match(UUID_FORMAT) || value.match(UUID_FORMAT).length == 0) 
      throw InvalidOfferId.InvalidFormatId(value);  
      this.value = value

    }


  }
