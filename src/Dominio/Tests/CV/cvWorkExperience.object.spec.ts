import { InvalidCvWorkExperienceError } from "../../AggRoots/CV/Errors/invalidCvWorkExperience.error"
import { CvWorkExperience } from "../../AggRoots/CV/ValueObjects/cvWorkExperience.object"

describe("CV Work Experience", () => {
    it("should not create when job is empty", () => {
        expect(() => new CvWorkExperience(
            "Some valid description",
            new Date(Date.now() - 1000),
            new Date(Date.now() - 500),
            "",
        )).toThrowError(InvalidCvWorkExperienceError)
    })
    it("should not create when description is empty", () => {
        expect(() => new CvWorkExperience(
            "",
            new Date(Date.now() - 1000),
            new Date(Date.now() - 500),
            "Developer",
        )).toThrowError(InvalidCvWorkExperienceError)
    })
    it("should not create when description is more than 500 characters", () => {
        let description = new Array(500).fill("a").join("")
        expect(() => new CvWorkExperience(
            description,
            new Date(Date.now() - 1000),
            new Date(Date.now() - 500),
            "Developer",
        )).toThrowError(InvalidCvWorkExperienceError)
    })
    it("should not create when work start date is after today", () => {
        expect(() => new CvWorkExperience(
            "Some valid description",
            new Date(Date.now() + 5000),
            new Date(Date.now() - 500),
            "Developer",
        )).toThrowError(InvalidCvWorkExperienceError)
    })
    it("should not create when work finish date is after today", () => {
        expect(() => new CvWorkExperience(
            "Some valid description",
            new Date(Date.now() - 3000),
            new Date(Date.now() + 1000),
            "Developer",
        )).toThrowError(InvalidCvWorkExperienceError)
    })
    it("should not create when work finish date is before start date", () => {
        expect(() => new CvWorkExperience(
            "Some valid description",
            new Date(Date.now() - 3000),
            new Date(Date.now() - 5000),
            "Developer",
        )).toThrowError(InvalidCvWorkExperienceError)
    })
    it("should create when all parameters are valid", () => {
        expect(new CvWorkExperience(
            "Some valid description",
            new Date(Date.now() - 3000),
            new Date(Date.now() - 2000),
            "Developer",
        )).toBeInstanceOf(CvWorkExperience)
    })
})
