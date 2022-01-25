//IDK if we should implement especific DTOs for each entity so I will comment this.

import { CandidateIdVo } from 'src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';

// class MeetingCandidateDTO{
//     public id: String;
//     public state: String;
//     public name: String;

//     public phone: String;
//     public email: String;
//     public birthDate: Date;
//     public location:LocationDTO ;

// }

// class MeetingEmployerDTO{
//     public employerId: String;
//     public name: String;
//     public description: String;
//     public state: String;
//     public location: LocationDTO;
//     public rif: String;
//     public phone: String;
//     public mail: String;
//   //  public comDesignation: EmployerComercialDesignationVO;
// }

export class MeetingDTO {
  public id: String;
  public state: MeetingStates;
  public description: String;
  public date: Date;
  public location: LocationDTO;
  public candidate: CandidateIdVo;
  public employer: EmployerDTO;
}
