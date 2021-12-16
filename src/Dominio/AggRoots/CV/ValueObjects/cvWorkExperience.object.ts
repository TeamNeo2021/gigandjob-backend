import { InvalidCvWorkExperienceError } from "../Errors/invalidCvWorkExperience.error"

export class CvWorkExperience {
    private _description: string
    private _startDate: Date
    private _finishDate: Date
    private _job: string

    get description() { return this._description }
    get startDate() { return this._startDate }
    get finishDate() { return this._finishDate }
    get job() { return this._job }

    constructor(
        _description: string,
        _startDate: Date,
        _finishDate: Date,
        _job: string,
    ) {
        if (!_description || _description.trim() == "") throw InvalidCvWorkExperienceError.emptyDescription()
        else if (_description.length < 500) throw InvalidCvWorkExperienceError.invalidDescriptionLength()
        else if (!_job || _job.trim() == "") throw InvalidCvWorkExperienceError.emptyJob()
        else if (_startDate.getDate() > Date.now()) throw InvalidCvWorkExperienceError.startDateIsNotBeforeToday(_startDate)
        else if (_startDate.getDate() > _finishDate.getDate()) throw InvalidCvWorkExperienceError.startDateIsNotBeforeFinishDate(_startDate, _finishDate)

        this._description = _description
        this._startDate = _startDate
        this._finishDate = _finishDate
        this._job = _job
    }
}
