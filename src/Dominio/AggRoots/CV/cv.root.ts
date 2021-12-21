import { CvRejectedDomainEvent } from "../../DomainEvents/CvEvents/cvRejected.event";
import { CvApprovedDomainEvent } from "../../DomainEvents/CvEvents/cvApproved.event";
import { CvSubmittedDomainEvent } from "../../DomainEvents/CvEvents/cvSubmitted.event";
import { IDomainEvent } from "../../DomainEvents/IDomainEvent";
import { IDomainEventHandler } from "../../DomainEvents/IDomainEventHandler";
import { AggregateRoot } from "../AggregateRoot";
import { InvalidCVStudiesError } from "./Errors/invalidCvStudies.error";
import { InvalidCvWorkExperienceError } from "./Errors/invalidCvWorkExperience.error";
import { CvCandidate } from "./ValueObjects/cvCandidate.object";
import { CvDescription } from "./ValueObjects/cvDescription.object";
import { CvId } from "./ValueObjects/cvId.object";
import { CvPhoto } from "./ValueObjects/cvPhoto.object";
import { CvStudies } from "./ValueObjects/cvStudies.object";
import { CvWorkExperience } from "./ValueObjects/cvWorkExperience.object";

export enum CvState {
    Approved = 0,
    Denied = 1,
    Submitted = 2
}

export class Cv<State extends CvState = CvState> extends AggregateRoot {
    public get state(): State {
        return this._state;
    }
    public set state(value: State) {
        this._state = value;
    }

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
        private _state: State,
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
    /**
     * Returns an Approved CV from this, a Submitted CV
     * All of the properties from the Submitted CV are cloned to the Approved CV
     * and the events as well
     *
     * Use the returned Cv instead of the old one
     *
     * @example
     * const submittedCv: Cv<CvState.Submitted> = Cv.submitCv(...) // A submitted Cv, represented by the type Cv<CvState.Submitted>
     * const approvedCv: Cv<CvState.Approved> = submittedCv.approved() // An approved Cv with the same properties and events as the submittedCv
     * */
    approve(this: Cv<CvState.Submitted>) {
        let event = new CvApprovedDomainEvent(this.id)
        let approvedCv = new Cv(this.description, this.workExperiences, this.studies, this.photo, this.candidate, CvState.Approved, this.id)
        this.Apply(event, undefined)
        approvedCv.changes.push(...this.changes)

        return approvedCv
    }

    /**
     * Returns Rejected CV from this, a Submitted CV
     * All of the properties from the Submitted CV are cloned to the Rejected CV
     * and the events as well
     *
     * Use the returned Cv instead of the old one
     *
     * @example
     * const submittedCv: Cv<CvState.Submitted> = Cv.submitCv(...) // A submitted Cv, represented by the type Cv<CvState.Submitted>
     * const approvedCv: Cv<CvState.Rejected> = submittedCv.reject() // A rejected Cv with the same properties and events as the submittedCv
     * */
    reject(this: Cv<CvState.Submitted>) {
        let event = new CvRejectedDomainEvent(this.id)
        let approvedCv = new Cv(this.description, this.workExperiences, this.studies, this.photo, this.candidate, CvState.Denied, this.id)
        this.Apply(event, undefined)
        approvedCv.changes.push(...this.changes)

        return approvedCv
    }
}
