

//IDK if we should implement especific DTOs for each entity so I will comment this.

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

class MeetingDTO{


    public candidate: CandidateDTO;
    public employer: EmployerDTO;
    public id: String;
    public state: String;
    public description: String;
    public date: Date;
    public location: LocationDTO;
}