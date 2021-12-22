export class InvalidCandidateState extends Error {

    static invalidCandidate(){ 
        return new InvalidCandidateState("Candidate state is invalid");
    }

    static candidateStateWhenRegistering(){
        return new InvalidCandidateState("Candidate state should be Active when is registered")
    }
}