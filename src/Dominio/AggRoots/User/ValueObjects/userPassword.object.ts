export class UserPassword {
    constructor(public readonly value: string) {
        if (this.value.trim().length < 10) throw new Error('Password less than 10 characters') // TODO: Create custom exception
    }
}