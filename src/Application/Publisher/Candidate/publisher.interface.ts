import { CandidatePublisherEvent } from "./event";

export interface CandidatePublisher {
    publish(evts: CandidatePublisherEvent[])
}