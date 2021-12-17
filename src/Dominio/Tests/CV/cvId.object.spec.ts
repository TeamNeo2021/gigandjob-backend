import { randomUUID } from "crypto"
import { InvalidCVIdError } from "../../AggRoots/CV/Errors/invalidCvId.error"
import { CvId } from "../../AggRoots/CV/ValueObjects/cvId.object"

describe("CV identity", () => {
    it("should fail when empty id is used", () => {
        expect(() => new CvId("")).toThrowError(InvalidCVIdError)
    })
    it("should fail when invalid id is used", () => {
        expect(() => new CvId("asdasfddasfa")).toThrowError(InvalidCVIdError) // Non UUID string
        expect(() => new CvId("944fadf6603d-4901-958a-591b94dbdae")).toThrowError(InvalidCVIdError) // Invalid length: 32
        expect(() => new CvId("944fadf6603d4901-958a-591b94dbdaec")).toThrowError(InvalidCVIdError) // Missing a separator
        expect(() => new CvId("w44fadf6603d4901-958a-591b94dbdaec")).toThrowError(InvalidCVIdError) // Invalid hex-character: w
    })
    it("should create when no parameters are passed", () => {
        expect(new CvId().id).not.toBe("")
    })
    it("should create when valid UUID is passed", () => {
        expect(new CvId(randomUUID())).toBeInstanceOf(CvId)
    })
})
