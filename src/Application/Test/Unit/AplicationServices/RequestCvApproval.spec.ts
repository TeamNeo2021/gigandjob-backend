import {CvService} from "../../../ApplicationServices/CvService.service";
//import { InMemoryCandidateCommandRepository } from "../../../Infrastructure/Memory/InMemoryCandidateCommandRepository.repo";
import { Cv } from "src/Dominio/AggRoots/CV/cv.root";

const RequestCvApprovalDTO = {
    cvID: "944fadf6-4901-958a-591b94dbdaer",
    candidateID: "944fadf6-4901-958a-591b94dbdaer",
    description: "CR7, Siiiuuuuuu",
    workExperiences: [
        {
            description: "Futball player",
            startDate: "2002",
            finishDate: "2018",
            job: "Player at "
        }
    ],
    studies: [
        {

            description: "Bachiller",
            startDate: "2002",
            finishDate: "2018",
            institution: "Lisbon college",
            degree: "bachiller en futball",
        }

    ],
    photo: Buffer.from([2]),
    candidatebirthdate: "2002",  
}
/*describe("register a new Candidate in memory", ()=>{

    
    it("should suceed when registering a valid Candidate",()=>{
        expect(registerService.RegisterCandidate(CandidateTestDTO)).toBeInstanceOf(Candidate);
    })

    
})*/
//const memoryRepo = new InMemoryCandidateCommandRepository()

//const registerService = new CvService(memoryRepo)

/*describe("register a new Candidate in memory", ()=>{

    
    it("should suceed when registering a valid Candidate",()=>{
        expect(registerService.RegisterCandidate(CandidateTestDTO)).toBeInstanceOf(Candidate);
    })

    
})
*/