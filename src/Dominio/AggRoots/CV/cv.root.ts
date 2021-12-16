import { CvCandidateId } from "./ValueObjects/cvCandidateId.object";
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

export class Cv<State extends CvState = CvState> {
    private _events: any[] = []

    get events(): readonly any[] {
        return this._events
    }

    private constructor(
        public id: CvId,
        public description: CvDescription,
        public workExperience: CvWorkExperience,
        public studies: CvStudies,
        public photo: CvPhoto,
        public candidateId: CvCandidateId,
        public state: State
    ) { }

    static submitCv(
        id: CvId,
        description: CvDescription,
        workExperience: CvWorkExperience,
        studies: CvStudies,
        photo: CvPhoto,
        candidateId: CvCandidateId,
    ) {
        let cv = new Cv(id, description, workExperience, studies, photo, candidateId, CvState.Submitted)
        cv._events.push({} /* TODO: CvSubmittedDomainEvent */)
        return cv
    }

    approve(this: Cv<CvState.Submitted>) {
        let event = {} // TODO: CvApprovedDomainEvent
        let approvedCv = new Cv(this.id, this.description, this.workExperience, this.studies, this.photo, this.candidateId, CvState.Approved)
        this._events.push(event)
        approvedCv._events.push(event)

        return approvedCv
    }

    denied(this: Cv<CvState.Submitted>) {
        let event = {} // TODO: CvDeniedDomainEvent
        let approvedCv = new Cv(this.id, this.description, this.workExperience, this.studies, this.photo, this.candidateId, CvState.Denied)
        this._events.push(event)
        approvedCv._events.push(event)

        return approvedCv
    }
}
