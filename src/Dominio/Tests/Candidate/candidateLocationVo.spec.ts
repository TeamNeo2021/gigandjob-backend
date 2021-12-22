import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO"
import { InvalidCandidateLocationError } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateLocation.error"

describe("create a new Candidate Location Value Object", ()=>{

    
    it("should fail when latitude is smaller than -90",()=>{
        expect(()=> new CandidateLocationVo(-100,56)).toThrowError(InvalidCandidateLocationError)
    }),
    it("should fail when latitude is bigger than 90",()=>{
        expect(()=> new CandidateLocationVo(100,56)).toThrowError(InvalidCandidateLocationError)
    }),
    it("should fail when longitude is smller than -180",()=>{
        expect(()=> new CandidateLocationVo(24,-200)).toThrowError(InvalidCandidateLocationError)
    }),
    it("should fail when longitude is bigger than 180",()=>{
        expect(()=> new CandidateLocationVo(24,200)).toThrowError(InvalidCandidateLocationError)
    }),
    it("should succeed when entering valid coordenates",()=>{
        expect(()=> new CandidateLocationVo(24,200))
    })

}
)