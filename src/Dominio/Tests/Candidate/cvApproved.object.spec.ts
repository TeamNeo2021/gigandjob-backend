import { randomUUID } from "crypto"
import { Candidate } from "../../AggRoots/Candidate/Candidate"
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo"
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { CandidateIdVo } from "../../AggRoots/Candidate/ValueObjects/CandidateIdVo"
import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO"
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo"
import { CandidateStatesEnum, CandidateStateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateStateVo"
import { Cv, CvState } from "../../AggRoots/CV/cv.root"
import { CvCandidate } from "../../AggRoots/CV/ValueObjects/cvCandidate.object"
import { CvDescription } from "../../AggRoots/CV/ValueObjects/cvDescription.object"
import { CvId } from "../../AggRoots/CV/ValueObjects/cvId.object"
import { CvStudies } from "../../AggRoots/CV/ValueObjects/cvStudies.object"
import { CvWorkExperience } from "../../AggRoots/CV/ValueObjects/cvWorkExperience.object"


describe("CV approved",()=>{

    it("CV status must change upon approval",()=>{
        
        const Cvsubmitted=Cv.submitCv(new CvDescription("Tengo 5 años de experiencia en python"),
        [new CvWorkExperience("Trabaje en un sistema de inventario con python",new Date(),new Date(),"no tengo")],
        [new CvStudies("Estudie 5 años ingenieria informatica",new Date(),new Date(),"UCAB","si")],
        null,
        new CvCandidate(randomUUID(),new Date(Date.now() - 5000)),
        new CvId(randomUUID()));

        let candidate:Candidate=
        new Candidate(
            new CandidateIdVo(randomUUID()),
            new CandidateStateVo(CandidateStatesEnum.Active,CandidateStatesEnum.Unapproved),
            new CandidateFullNameVo("Antonio","Nohra"),
            new CandidatePhoneVo("+58","4667524"),
            new CandidateEmailVo("atag102@gmail.com"),
            new CandidateBirthDateVo(new Date()),
            new CandidateLocationVo(23,21),
            Cvsubmitted          
            );
            candidate.approveCVAspirant(Cvsubmitted);
        expect(candidate.CV.state).toEqual(CvState.Approved)
    })

})