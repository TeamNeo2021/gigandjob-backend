
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo"
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo"
import { InvalidCandidateEmail } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateEmail.error"
import { InvalidCandidatePhoneNumber } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidatePhoneNumber.error"
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { EmptyCandidateName } from "../../AggRoots/Candidate/ValueObjects/Errors/emptyCandidateName.error"
import { InvalidCandidateBirthDate } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateBirthDate.error"
import { ValidateCandidateAge } from "../../DomainService/ValidateCandidateAge"
import { CandidateLocationVo } from "../../AggRoots/Candidate/ValueObjects/CandidateLocationVO"
import { InvalidCandidateLocationError } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateLocation.error"


    /**
     * Unit tests related to Candidate Value Objects and the register of a new Candidate
     * */
describe("register a new Candidate", ()=>{
    
    it("should fail when empty name is entered", ()=>{ //Validate names are not empty
        expect(()=>new CandidateFullNameVo('','')).toThrowError(EmptyCandidateName)
    }),
    
    //validate Phone Number
    it("should fail when an empty phone number is entered",()=>{
        expect(()=> new CandidatePhoneVo('51','')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    it("should fail if phone lenght is shorter",()=>{
        expect(()=> new CandidatePhoneVo('57','123456')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    it("should fail if phone lenght is longer",()=>{
        expect(()=> new CandidatePhoneVo('57','12345678')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    it("should fail if area code is empty",()=>{
        expect(()=> new CandidatePhoneVo('','12345678')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    it("should fail if area code is not in the list",()=>{
        expect(()=> new CandidatePhoneVo('198','12345678')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    it("should fail when an empty phone number is entered",()=>{
        expect(()=> new CandidatePhoneVo('','')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    it("should succeed when a valid phone number is entered",()=>{
        expect(()=> new CandidatePhoneVo('58','4407938')) //caso exito
    }),
    //Validate identification empty
    //Validate email empty
    it('',()=>{
        expect(()=> new CandidateEmailVo('')).toThrowError(InvalidCandidateEmail);
    }),
    //Validate birthdate empty
    it('candidate under a given age cannot be registered', ()=>{
        expect(()=>new ValidateCandidateAge().validate(
            
            18,
             new CandidateBirthDateVo( new Date("2005-01-16"))
        )
              ).toThrowError(InvalidCandidateBirthDate)
    }),

    //Validate location
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
    })
    
})