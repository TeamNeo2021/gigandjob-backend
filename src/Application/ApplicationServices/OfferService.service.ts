import { IApplicationService } from "../Core/IApplicationService";

class OfferService implements IApplicationService {

    Handle(command: any): void {

        switch (command.type) {
            //todo definir como se van a tratar los comandos
            // case LikeOffer:

            //     break;
            // case applyToOffer:

            //     break;

            default:
                throw new Error(`OfferService: Command doesn't exist: ${command.type}`);
                break;
        }
       
    }

}