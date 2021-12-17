export class InvalidCVStudiesError extends Error {
    static emptyDescription() {
        return new InvalidCVStudiesError("The cv studies description must no be empty")
    }
    static emptyDegree() {
        return new InvalidCVStudiesError("The cv studies degree must no be empty")
    }
    static emptyInstitution() {
        return new InvalidCVStudiesError("The cv studies institution must no be empty")
    }
    static invalidDescriptionLength() {
        return new InvalidCVStudiesError("The cv studies description must be less than 500 characters")
    }
    static startDateIsNotBeforeToday(date: Date) {
        return new InvalidCVStudiesError(`The cv studies start date must be before today: ${date.toUTCString()}`)
    }
    static finishDateIsNotBeforeToday(date: Date) {
        return new InvalidCVStudiesError(`The cv studies finish date must be before today: ${date.toUTCString()}`)
    }
    static startDateIsNotBeforeFinishDate(startDate: Date, finalDate: Date) {
        return new InvalidCVStudiesError(
            `The cv studies start date must be before final date studies: ${startDate.toUTCString()} < ${finalDate.toUTCString()} `
        )
    }
}
