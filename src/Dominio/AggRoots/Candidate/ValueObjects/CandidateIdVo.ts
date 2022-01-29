import { randomUUID } from "crypto";

export class CandidateIdVo {
    private _value: string;

    constructor(id: string = randomUUID()) {
      this._value = id;
    }
    public get value(): string {
        return this._value;
    }

  }
  