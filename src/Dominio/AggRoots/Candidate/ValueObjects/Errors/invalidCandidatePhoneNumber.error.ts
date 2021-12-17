export class InvalidCandidatePhoneNumber extends Error {

    static emptyPhoneNumber() {
        return new InvalidCandidatePhoneNumber("Candidate phone number cannot be empty")
    }  

    static invalidPhoneNumber() {
        return new InvalidCandidatePhoneNumber(" Candidate Phone number can only contain numbers")
    }  
   
}
