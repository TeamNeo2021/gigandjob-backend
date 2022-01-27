import { Module } from "@nestjs/common";
import { CandidateRegisterService } from "../../Application/ApplicationServices/CandidateRegister.service";
import { CandidateApi } from "../API/Candidate/candidateRegister.controller";

@Module({
  imports: [],
  providers: [
    CandidateRegisterService,
  ],
  controllers: [
    CandidateApi
  ]
})
export class CandidateModule {}