import { Injectable } from "@nestjs/common";
import { EventBus } from "@nestjs/cqrs";
import { clearConfigCache } from "prettier";
import { Publisher as Contract } from "src/Application/Publisher/publisher.interface"

@Injectable()
export class Publisher implements Contract {
    constructor(private bus: EventBus) {}

    async publish(evts: any[]) {
        
        this.bus.publishAll(evts) 
    }
}