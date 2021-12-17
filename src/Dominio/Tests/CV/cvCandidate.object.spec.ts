import { randomUUID } from "crypto"
import { InvalidCvCandidate } from "../AggRoots/CV/Errors/invalidCvCandidate.error"
import { CvCandidate } from "../AggRoots/CV/ValueObjects/cvCandidate.object"

describe("Cv candidate", () => {
   it("should not create when id is empty", () => {
      expect(() => new CvCandidate("", new Date(Date.now() - 2000))).toThrowError(InvalidCvCandidate)
   })
   it("should not create when id is invalid", () => {
      expect(() => new CvCandidate("asdasfddasfa", new Date(Date.now() - 2000))).toThrowError(InvalidCvCandidate)
      expect(() => new CvCandidate("944fadf6603d-4901-958a-591b94dbdae", new Date(Date.now() - 2000))).toThrowError(InvalidCvCandidate)
      expect(() => new CvCandidate("944fadf6603d4901-958a-591b94dbdaec", new Date(Date.now() - 2000))).toThrowError(InvalidCvCandidate)
      expect(() => new CvCandidate("w44fadf6603d4901-958a-591b94dbdaec", new Date(Date.now() - 2000))).toThrowError(InvalidCvCandidate)
   })
   it("should not create when birthdate is after today", () => {
      expect(() => new CvCandidate(randomUUID(), new Date(Date.now() + 1000))).toThrowError(InvalidCvCandidate)
   })
   it("should create when id and birthdate are valid", () => {
      expect(new CvCandidate(randomUUID(), new Date(Date.now() - 5000))).toBeInstanceOf(CvCandidate)
   })
})
