import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { CvCandidate } from "../ValueObjects/cvCandidate.object";
import { CvDescription } from "../ValueObjects/cvDescription.object";
import { CvId } from "../ValueObjects/cvId.object";
import { CvPhoto } from "../ValueObjects/cvPhoto.object";
import { CvStudies } from "../ValueObjects/cvStudies.object";
import { CvWorkExperience } from "../ValueObjects/cvWorkExperience.object";

export class CvSubmittedDomainEvent implements IDomainEvent {
    dateTimeOcurred: Date;

    constructor(
        public readonly id: CvId,
        public readonly workExperiences: CvWorkExperience[],
        public readonly studies: CvStudies[],
        public readonly photo: CvPhoto,
        public readonly candidate: CvCandidate,
        public readonly description: CvDescription
    ) { }
}
