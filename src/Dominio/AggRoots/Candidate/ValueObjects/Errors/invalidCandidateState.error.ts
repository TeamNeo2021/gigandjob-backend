export class InvalidCandidateState extends Error {

    static invalidCandidate(){ 
        return new InvalidCandidateState("Candidate state is invalid");
    }
}