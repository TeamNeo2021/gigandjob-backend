export class CandidateMailVo{
    private _mail: String;

    constructor(mail:String){
        if (this.mailValidate(mail)){
            this._mail = mail;
        }
    }

    get mail(): String{
        return this.mail;
    }

    protected mailValidate(mail: String): boolean{
        const mailPatten = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (mailPatten.test(mail.toString())){
            return true;
        }else{
            throw new Error('El correo electronico debe ser valido');
        }
    }
}