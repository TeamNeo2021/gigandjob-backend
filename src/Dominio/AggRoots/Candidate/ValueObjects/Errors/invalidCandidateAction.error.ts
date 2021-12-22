export class InvalidCandidateAction extends Error {

    static alreadyRegistered(){ 
        return new InvalidCandidateAction("this Candidate has been already registered");
    }

  
}