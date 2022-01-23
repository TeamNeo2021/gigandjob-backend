import { EmployerPublisherEvent } from "./event";

export interface EmployerPublisher {
    publish(evts: EmployerPublisherEvent[])
}