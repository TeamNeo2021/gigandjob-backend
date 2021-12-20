import { InvalidCVStudiesError } from "../Errors/invalidCvStudies.error";

export class CvStudies {
    private _description: string
    private _startDate: Date
    private _finishDate: Date
    private _institution: string
    private _degree: string

    get description() { return this._description }
    get startDate() { return this._startDate }
    get finishDate() { return this._finishDate }
    get institution() { return this._institution }
    get degree() { return this._degree }

    constructor(
        _description: string,
        _startDate: Date,
        _finishDate: Date,
        _institution: string,
        _degree: string
    ) {
        if (!_description || _description.trim() == "") throw InvalidCVStudiesError.emptyDescription()
        else if (_description.length >= 500) throw InvalidCVStudiesError.invalidDescriptionLength()
        else if (!_degree || _degree.trim() == "") throw InvalidCVStudiesError.emptyDegree()
        else if (!_institution || _institution.trim() == "") throw InvalidCVStudiesError.emptyInstitution()
        else if (_startDate.getTime() > Date.now()) throw InvalidCVStudiesError.startDateIsNotBeforeToday(_startDate)
        else if (_finishDate.getTime() > Date.now()) throw InvalidCVStudiesError.startDateIsNotBeforeToday(_startDate)
        else if (_startDate.getTime() > _finishDate.getTime()) throw InvalidCVStudiesError.startDateIsNotBeforeFinishDate(_startDate, _finishDate)

        this._description = _description
        this._startDate = _startDate
        this._finishDate = _finishDate
        this._institution = _institution
        this._degree = _degree
    }
}
