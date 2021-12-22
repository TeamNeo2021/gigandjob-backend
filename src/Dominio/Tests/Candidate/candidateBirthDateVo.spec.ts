import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { InvalidCandidateBirthDate } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateBirthDate.error"

describe("create Candidate Email Value Object", ()=>{
    
    it('should fail when a date under the minimum age is registered', ()=>{
        expect(()=> new CandidateBirthDateVo( new Date("2005-01-16")) ).toThrowError(InvalidCandidateBirthDate)
    }),
    
    it('should fail when the birthDate hasnt happened yet', ()=>{
        expect(()=>new CandidateBirthDateVo( new Date("2050-01-16")) ).toThrowError(InvalidCandidateBirthDate)
    }),
    it('should succeed when entering a valid Birhtdate', ()=>{
        expect(()=>new CandidateBirthDateVo( new Date("2000-01-16")) )
    })
  
   }
   )