export class InvalidCandidateBirthDate extends Error {

    static emptyBirthDate() {
        return new InvalidCandidateBirthDate("Candidate birthDate cannot be empty")
    }  
    static birthDateAfterToday() {
        return new InvalidCandidateBirthDate("Date invalid, Candidate hasn't born yet")
    }
    static candidateUnderAge(ageLimit:Number) {
        return new InvalidCandidateBirthDate("User cannot be registered, age is under "+ageLimit+" years old")
    }

}
