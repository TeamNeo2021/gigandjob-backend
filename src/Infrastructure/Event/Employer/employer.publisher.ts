import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { EmployerPublisherEvent } from "src/Application/Publisher/Employer/event";
import { EmployerPublisher as Contract } from "src/Application/Publisher/Employer/publisher.interface";

@Injectable()
export class EmployerPublisherService implements Contract {
    constructor(private eventBus: EventBus<EmployerPublisherEvent>) {}

    publish(evts: EmployerPublisherEvent[]) {
        console.log(evts)
        this.eventBus.publishAll(evts)
    }
}