export class InvalidCvWorkExperienceError extends Error {
    static emptyDescription() {
        return new InvalidCvWorkExperienceError("The cv work experience description must no be empty")
    }
    static emptyJob() {
        return new InvalidCvWorkExperienceError("The cv work experience job must no be empty")
    }
    static invalidDescriptionLength() {
        return new InvalidCvWorkExperienceError("The cv work experience description must be less than 500 characters")
    }
    static startDateIsNotBeforeToday(date: Date) {
        return new InvalidCvWorkExperienceError(`The cv work experience start date must be before today: ${date.toUTCString()}`)
    }
    static startDateIsNotBeforeFinishDate(startDate: Date, finalDate: Date) {
        return new InvalidCvWorkExperienceError(
            `The cv work experience start date must be before final date studies: ${startDate.toUTCString()} < ${finalDate.toUTCString()} `
        )
    }
}
