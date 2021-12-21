import { Candidate } from '../AggRoots/Candidate/Candidate';
import { CandidateBirthDateVo } from '../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo';
import { CandidateEmailVo } from '../AggRoots/Candidate/ValueObjects/CandidateEmailVo';
import { CandidateFullNameVo } from '../AggRoots/Candidate/ValueObjects/CandidateFullNameVo';
import { CandidateIdVo } from '../AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { CandidateLocationVo } from '../AggRoots/Candidate/ValueObjects/CandidateLocationVO';
import { CandidatePhoneVo } from '../AggRoots/Candidate/ValueObjects/CandidatePhoneVo';
import { CandidateStateVo } from '../AggRoots/Candidate/ValueObjects/CandidateStateVo';
import { Cv } from '../AggRoots/CV/cv.root';
import { CvCandidate } from '../AggRoots/CV/ValueObjects/cvCandidate.object';
import { CvDescription } from '../AggRoots/CV/ValueObjects/cvDescription.object';
import { CvId } from '../AggRoots/CV/ValueObjects/cvId.object';
import { CvPhoto } from '../AggRoots/CV/ValueObjects/cvPhoto.object';
import { CvStudies } from '../AggRoots/CV/ValueObjects/cvStudies.object';
import { CvWorkExperience } from '../AggRoots/CV/ValueObjects/cvWorkExperience.object';
import { IDomainEvent } from './IDomainEvent';

export class CvAspirantApproved  implements IDomainEvent {
    public dateTimeOcurred: Date;
    public CvAspirantApproved:Cv;

    constructor(CvAspirant:Cv) {
        const sumb3=Cv.submitCv(CvAspirant.description,
            CvAspirant.workExperiences,
            CvAspirant.studies,
            CvAspirant.photo,
            CvAspirant.candidate,
            CvAspirant.id);
        this.dateTimeOcurred = new Date(Date.now());
        this.CvAspirantApproved=sumb3.approve();
    }
}