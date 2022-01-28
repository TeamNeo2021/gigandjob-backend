import { Module } from "@nestjs/common";
import { CandidateApplicationService } from "../../Application/ApplicationServices/CandidateApplicationService.service";
import { CandidateController } from "../Controllers/candidateController.controller";

@Module({
  imports: [],
  providers: [
    CandidateApplicationService,
  ],
  controllers: [
    CandidateController
  ]
})
export class CandidateModule {}