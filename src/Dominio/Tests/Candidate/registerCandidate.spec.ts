
import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo"
import { CandidatePhoneVo } from "../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo"
import { InvalidCandidateEmail } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateEmail.error"
import { InvalidCandidatePhoneNumber } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidatePhoneNumber.error"
import { CandidateBirthDateVo } from "../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo"
import { CandidateFullNameVo } from "../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo"
import { EmptyCandidateName } from "../../AggRoots/Candidate/ValueObjects/Errors/emptyCandidateName.error"
import { InvalidCandidateBirthDate } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateBirthDate.error"
import { ValidateCandidateAge } from "../../DomainService/ValidateCandidateAge"


//A7/D5 Validar que el nombre completo, teléfono, cédula. correo eléctronico y fecha de nacimiento, no esten vacíos
describe("register a new Candidate", ()=>{
    
    it("should fail when empty name is entered", ()=>{ //Validate names are not empty
        expect(()=>new CandidateFullNameVo('','')).toThrowError(EmptyCandidateName)
    }),
    //Validate phone number empty
    it("should fail when an empty phone number is entered",()=>{
        expect(()=> new CandidatePhoneVo('')).toThrowError(InvalidCandidatePhoneNumber)
    }),
    //validate if phone number is invalid
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
    })
    
})