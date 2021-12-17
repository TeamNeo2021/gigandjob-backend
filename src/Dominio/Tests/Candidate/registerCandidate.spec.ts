import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { EmptyCandidateName } from "../../AggRoots/Candidate/ValueObjects/Errors/emptyCandidateName.error"
import { InvalidCandidateBirthDate } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateBirthDate.error"
import { ValidateCandidateAge } from "../../DomainService/ValidateCandidateAge"

describe("register a new Candidate", ()=>{
    it("should fail when empty name is entered", ()=>{ //Validate names are not empty
        expect(()=>new CandidateFullNameVo('','')).toThrowError(EmptyCandidateName)
    }),
    it('candidate under a given age cannot be registered', ()=>{
        expect(()=>new ValidateCandidateAge().validate(
            
            18,
             new CandidateBirthDateVo( new Date("2005-01-16"))
        )
              ).toThrowError(InvalidCandidateBirthDate)
    })
    
})