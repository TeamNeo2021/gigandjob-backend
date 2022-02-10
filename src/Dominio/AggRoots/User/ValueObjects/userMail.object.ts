export class UserMail {
    constructor(public readonly value: string) {
        const emailPatten = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value == ''){
            throw new Error('Empty email') // TODO: Create custom exception;
        }
       
        if (!emailPatten.test(value)) throw new Error('Invalid email'); // TODO: Create custom exception
    }
}