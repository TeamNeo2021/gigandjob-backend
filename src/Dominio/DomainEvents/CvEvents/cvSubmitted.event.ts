import { CvCandidate } from "src/Dominio/AggRoots/CV/ValueObjects/cvCandidate.object";
import { CvDescription } from "src/Dominio/AggRoots/CV/ValueObjects/cvDescription.object";
import { CvId } from "src/Dominio/AggRoots/CV/ValueObjects/cvId.object";
import { CvPhoto } from "src/Dominio/AggRoots/CV/ValueObjects/cvPhoto.object";
import { CvStudies } from "src/Dominio/AggRoots/CV/ValueObjects/cvStudies.object";
import { CvWorkExperience } from "src/Dominio/AggRoots/CV/ValueObjects/cvWorkExperience.object";
import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";

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
