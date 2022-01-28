import {CvService} from "../../../ApplicationServices/CvService.service";

import { Cv } from "src/Dominio/AggRoots/CV/cv.root";
import { InMemoryCvCommandRepository } from "src/Infrastructure/Memory/InMemoryCvCommandRepository.repo";
import { RequestCvApprovalDTO } from "src/Application/DTO/Candidate/RequestCvApproval.dto";
import { randomUUID } from "crypto";

const UUID = randomUUID()
const RequestCvApprovalDTO1 = new RequestCvApprovalDTO(
    UUID,
    UUID,
     "CR7, Siiiuuuuuu",
     [
        {
            description: "Futball player",
            startDate: "2002",
            finishDate: "2018",
            job: "Player at "
        }
    ],
     [
        {

            description: "Bachiller",
            startDate: "2002",
            finishDate: "2018",
            institution: "Lisbon college",
            degree: "bachiller en futball",
        }

    ],
     Buffer.from([2]),
     "1990",  
)

const memoryRepo = new InMemoryCvCommandRepository()

const submitcv = new CvService(memoryRepo)

describe("submit a new Cv in memory", ()=>{
    
    it("should suceed when submiting a valid Cv", async()=>{
        submitcv.Handle(RequestCvApprovalDTO1);
        let cv = await memoryRepo.getAll()
        expect(cv[0]).toBeTruthy();
    })

    
})