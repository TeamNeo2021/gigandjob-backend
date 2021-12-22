import { CandidateEmailVo } from "../../AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { InvalidCandidateEmail } from "../../AggRoots/Candidate/ValueObjects/Errors/invalidCandidateEmail.error";

describe("create Candidate Email Value Object", ()=>{
    
 it('should fail when inserting an empty email',()=>{
    expect(()=> new CandidateEmailVo('')).toThrowError(InvalidCandidateEmail);
}), 
it('should succeed when email doesnt match the format',()=>{
    expect(()=> new CandidateEmailVo('examplegmailcom')).toThrowError(InvalidCandidateEmail);
}), 
    
it('should succeed when inserting a valid email',()=>{
    expect(()=> new CandidateEmailVo('example@gmail.com'));
})

}
)