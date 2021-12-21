import { randomUUID } from "crypto";

export class CandidateIdVo {
    private _value: string;

    constructor() {
      this._value = randomUUID();
    }
    public get value(): string {
        return this._value;
    }

  }
  