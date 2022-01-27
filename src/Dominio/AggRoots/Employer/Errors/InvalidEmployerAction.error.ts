export class InvalidEmployerAction extends Error {

    static alreadyRegistered(){ 
        return new InvalidEmployerAction("this Employer has been already registered");
    }

    static alreadyEliminated(){
        return new InvalidEmployerAction('this Employer has been already eliminated');
    }

    static alreadySuspended(){
        return new InvalidEmployerAction('this Employer has been already suspended');
    }

    static alreadyActive(){
        return new InvalidEmployerAction('this Employer is Active right now');
    }

    static notSuspended(){
        return new InvalidEmployerAction('this Employer is not suspended');
    }
}