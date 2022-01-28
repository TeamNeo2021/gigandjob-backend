import { Injectable } from "@nestjs/common";
import { CandidateConfiguration } from "src/Application/Configuration/Candidate/configuration.interface";

@Injectable()
export class CandidateSuspensionsLimitService implements CandidateConfiguration {
    getSuspensionLimit(): Promise<number> {
        return Promise.resolve(Number(process.env.CANDIDATE_SUSPENSIONS_LIMIT || 3))
    }
}