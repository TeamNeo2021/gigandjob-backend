import { CandidateBirthDateVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateFullNameVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { EmptyCandidateName } from "src/Dominio/AggRoots/Candidate/ValueObjects/Errors/emptyCandidateName.error"
import { InvalidCandidateBirthDate } from "src/Dominio/AggRoots/Candidate/ValueObjects/Errors/invalidCandidateBirthDate.error"
import { ValidateCandidateAge } from "src/Dominio/DomainService/ValidateCandidateAge"

describe("register a new Candidate", ()=>{
    it("should fail when empty name is entered", ()=>{ //Validate names are not empty
        expect(()=>new CandidateFullNameVo('','')).toThrowError(EmptyCandidateName)
    }),
    it('candidate under a given age cannot be registered'), ()=>{
        expect(()=>new ValidateCandidateAge().validate(
            
            18,
             new CandidateBirthDateVo( new Date("2005-01-16"))
        )
              ).toThrowError(InvalidCandidateBirthDate)
    }, 
    
})