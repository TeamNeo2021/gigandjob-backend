import { UserId } from "./ValueObjects/userId.object";
import { UserMail } from "./ValueObjects/userMail.object";
import { UserPassword } from "./ValueObjects/userPassword.object";

export class User {
    constructor(public readonly id: UserId, public readonly password: UserPassword, public readonly mail: UserMail) {}

    passwordMatches(password: string) {
        return this.password.value == password
    }
}