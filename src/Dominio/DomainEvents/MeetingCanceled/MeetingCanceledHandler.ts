import { Meeting } from "src/Dominio/AggRoots/Meeting/Meeting";
import { MeetingDateVO } from "src/Dominio/AggRoots/Meeting/ValueObjects/MeetingDateVO";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { MeetingCanceled } from "./MeetingCanceled";

export class MeetingCanceledHandler implements IDomainEventHandler {
  handle(event: MeetingCanceled, aggregate: Meeting): void{
    let today = new MeetingDateVO(new Date());
    if (aggregate.date > today){
      aggregate.state = event.state;
    }
    else{
      throw new Error("The meeting cannot be canceled because it has already happened or is happening");
    }
  }
}