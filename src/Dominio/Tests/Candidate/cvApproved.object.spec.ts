import { randomUUID } from "crypto";
import { Candidate } from "../../AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { Cv } from "../../AggRoots/CV/cv.root";
import { CvCandidate } from "../../AggRoots/CV/ValueObjects/cvCandidate.object";
import { CvDescription } from "../../AggRoots/CV/ValueObjects/cvDescription.object";
import { CvId } from "../../AggRoots/CV/ValueObjects/cvId.object";
import { CvStudies } from "../../AggRoots/CV/ValueObjects/cvStudies.object";
import { CvWorkExperience } from "../../AggRoots/CV/ValueObjects/cvWorkExperience.object";
import { CvAspirantApproved } from "../../DomainEvents/Candidate/CvAspirantApproved";


const ApprovedCvCandidateEvent = ()=>{

let exampleCandidate = new Candidate(
    new CandidateIdVo(),
    new CandidateStateVo(CandidateStatesEnum.Active),
    new CandidateFullNameVo('Peter', 'Parker'),
    new CandidatePhoneVo('0414', '4407938'),
    new CandidateEmailVo('spidey@gmail.com'),
    new CandidateBirthDateVo(new Date('2000-01-16')),
    new CandidateLocationVo(20, 90));

    const cv:Cv=Cv.submitCv(
        new CvDescription("Tengo 5 años de experiencia en python"),
        [new CvWorkExperience("Trabaje en un sistema de inventario con python",new Date(),new Date(),"no tengo")],
        [new CvStudies("Estudie 5 años ingenieria informatica",new Date(),new Date(),"UCAB","si")],
        null,
        new CvCandidate(randomUUID(),new Date(Date.now() - 5000)),
        new CvId(randomUUID()));

    exampleCandidate.Cv=cv;

 return exampleCandidate.ApprovedCvCandidate();
}

describe("CV approved",()=>{
    it("CV status must change upon approval",()=>{
        const candidate= ApprovedCvCandidateEvent()
        expect(candidate.GetChanges()[0]).toBeInstanceOf(CvAspirantApproved);
    })
})