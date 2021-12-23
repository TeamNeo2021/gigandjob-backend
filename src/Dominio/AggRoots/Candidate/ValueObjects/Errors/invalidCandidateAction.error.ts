export class InvalidCandidateAction extends Error {

    static alreadyRegistered(){ 
        return new InvalidCandidateAction("this Candidate has been already registered");
    }

    static alreadyEliminated(){
        return new InvalidCandidateAction('this candidate has been already eliminated');
    }

    static alreadySuspended(){
        return new InvalidCandidateAction('this candidate has been already suspended');
    }

    static alreadyActive(){
        return new InvalidCandidateAction('this candidate is Active right now');
    }

    static notSuspended(){
        return new InvalidCandidateAction('this candidate is not suspended');
    }
}