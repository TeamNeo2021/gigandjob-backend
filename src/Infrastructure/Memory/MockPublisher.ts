import { Publisher } from "../../Application/Publisher/publisher.interface";

export class MockPublisher implements Publisher{
    publish(evts: any[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}