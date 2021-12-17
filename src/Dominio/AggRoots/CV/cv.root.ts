import { IDomainEvent } from "src/Dominio/DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "src/Dominio/DomainEvents/IDomainEventHandler";
import { AggregateRoot } from "../AggregateRoot";
import { InvalidCVStudiesError } from "./Errors/invalidCvStudies.error";
import { InvalidCvWorkExperienceError } from "./Errors/invalidCvWorkExperience.error";
import { CvApprovedDomainEvent } from "./Events/cvApproved.event";
import { CvRejectedDomainEvent } from "./Events/cvRejected.event";
import { CvSubmittedDomainEvent } from "./Events/cvSubmitted.event";
import { CvCandidate } from "./ValueObjects/cvCandidate.object";
import { CvDescription } from "./ValueObjects/cvDescription.object";
import { CvId } from "./ValueObjects/cvId.object";
import { CvPhoto } from "./ValueObjects/cvPhoto.object";
import { CvStudies } from "./ValueObjects/cvStudies.object";
import { CvWorkExperience } from "./ValueObjects/cvWorkExperience.object";

enum CvState {
    Approved = 0,
    Denied = 1,
    Submitted = 2
}

export class Cv<State extends CvState = CvState> extends AggregateRoot {

    protected When(event: IDomainEvent, handler: IDomainEventHandler): void {
        handler?.handle(event, this)
    }

    protected EnsureValidState(): void {
        if (this.studies.length == 0) throw new InvalidCVStudiesError("Studies cannot be empty")
        if (this.workExperiences.length == 0) throw new InvalidCvWorkExperienceError("Studies cannot be empty")

        this.studies.forEach((study) => {
            if (this.candidate.birthdate >= study.startDate || this.candidate.birthdate >= study.finishDate)
                throw new InvalidCVStudiesError("The studies start date nor finish date cannot be before the birthdate")
        })
        this.workExperiences.forEach((workExperience) => {
            if (this.candidate.birthdate >= workExperience.startDate || this.candidate.birthdate >= workExperience.finishDate)
                throw new InvalidCvWorkExperienceError("The work experience start date nor finish date cannot be before the birthdate")
        })
    }

    private constructor(
        public description: CvDescription,
        public workExperiences: CvWorkExperience[],
        public studies: CvStudies[],
        public photo: CvPhoto,
        public candidate: CvCandidate,
        public state: State,
        public id: CvId = new CvId(),
    ) { super() }

    static submitCv(
        description: CvDescription,
        workExperiences: CvWorkExperience[],
        studies: CvStudies[],
        photo: CvPhoto,
        candidate: CvCandidate,
        id: CvId = new CvId(),
    ) {
        let cv = new Cv(description, workExperiences, studies, photo, candidate, CvState.Submitted, id)
        cv.Apply(
            new CvSubmittedDomainEvent(
                id,
                workExperiences,
                studies,
                photo,
                candidate,
                description
            ),
            undefined
        )
        return cv
    }

    approve(this: Cv<CvState.Submitted>) {
        let event = new CvApprovedDomainEvent(this.id)
        let approvedCv = new Cv(this.description, this.workExperiences, this.studies, this.photo, this.candidate, CvState.Approved, this.id)
        this.Apply(event, undefined)
        approvedCv.changes.push(...this.changes)

        return approvedCv
    }

    reject(this: Cv<CvState.Submitted>) {
        let event = new CvRejectedDomainEvent(this.id)
        let approvedCv = new Cv(this.description, this.workExperiences, this.studies, this.photo, this.candidate, CvState.Denied, this.id)
        this.Apply(event, undefined)
        approvedCv.changes.push(...this.changes)

        return approvedCv
    }
}
