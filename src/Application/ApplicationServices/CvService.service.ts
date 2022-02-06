import { IApplicationService } from '../Core/IApplicationService';
import { ICVCommandRepository } from '../Repositories/CVRepository.repo';
import { RequestCvApprovalDTO } from '../DTO/Candidate/RequestCvApproval.dto';
import { Cv, CvState } from '../../Dominio/AggRoots/CV/cv.root';
import { CvCandidate } from '../../Dominio/AggRoots/CV/ValueObjects/cvCandidate.object';
import { CvDescription } from '../../Dominio/AggRoots/CV/ValueObjects/cvDescription.object';
import { CvId } from '../../Dominio/AggRoots/CV/ValueObjects/cvId.object';
import { CvPhoto } from '../../Dominio/AggRoots/CV/ValueObjects/cvPhoto.object';
import { CvStudies } from '../../Dominio/AggRoots/CV/ValueObjects/cvStudies.object';
import { CvWorkExperience } from '../../Dominio/AggRoots/CV/ValueObjects/cvWorkExperience.object';

export class CvService implements IApplicationService {
  private commandRepository: ICVCommandRepository;

  constructor(commandRepository: ICVCommandRepository) {
    this.commandRepository = commandRepository;
  }

  async Handle(command: any): Promise<void> {
    console.log('entra al handle');
    switch (command.constructor) {
      case RequestCvApprovalDTO: {
        console.log('entra al case');

        let cmd: RequestCvApprovalDTO = <RequestCvApprovalDTO>command;
        console.log('1');

        let Workxp: CvWorkExperience[] = [];
        let Studies: CvStudies[] = [];
        for (const iterator of cmd.workExperiences) {
          Workxp.push(
            new CvWorkExperience(
              iterator.description,
              new Date(iterator.startDate),
              new Date(iterator.finishDate),
              iterator.job,
            ),
          );
        }
        console.log('2');
        for (const iterator of cmd.studies) {
          Studies.push(
            new CvStudies(
              iterator.description,
              new Date(iterator.startDate),
              new Date(iterator.finishDate),
              iterator.institution,
              iterator.degree,
            ),
          );
        }
        console.log('3');
        const submittedCv: Cv<CvState.Submitted> = Cv.submitCv(
          new CvDescription(cmd.description),
          Workxp,
          Studies,
          new CvPhoto(cmd.photo),
          new CvCandidate(cmd.candidateID, new Date(cmd.candidatebirthdate)),
          new CvId(cmd.cvID),
        );
        console.log('antes del save');
        await this.commandRepository.save(submittedCv);

        break;
      }

      default:
        throw new Error(`CvService: Command doesn't exist: ${command.type}`);
        break;
    }
  }
}
