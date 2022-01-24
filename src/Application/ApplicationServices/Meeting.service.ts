import { Injectable } from '@nestjs/common';
import { IApplicationService } from '../Core/IApplicationService';
import { AcceptMeeting } from '../DTO/Meeting/AcceptMeeting';

@Injectable()
export class MeetingService implements IApplicationService {
  Handle(command: Object): void {
    switch (command.constructor) {
      case AcceptMeeting:
        console.log('oferta aceptada');
        break;
      // case applyToOffer:

      //     break;
      default:
        throw new Error(
          `OfferService: Command doesn't exist: ${command.constructor}`,
        );
        break;
    }
  }
}
