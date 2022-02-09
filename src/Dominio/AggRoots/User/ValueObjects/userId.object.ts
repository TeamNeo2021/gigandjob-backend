const UUID_FORMAT =
    /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g

export class UserId {
    constructor(public readonly value: string) {
        if (!value || value.trim() == "") throw new Error('Empty user id') // TODO: Change to custom exception
        if (!value.match(UUID_FORMAT) || value.match(UUID_FORMAT).length == 0) throw new Error('Invalid UUID') // TODO: Change to custom exception
    }
}