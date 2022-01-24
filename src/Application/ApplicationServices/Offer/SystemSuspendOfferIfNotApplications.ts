
/*export class SystemSuspendOfferIfNotApplication {
    constructor() {}

    async execute(): Promise<CandidateCommandResult<void>> {
        const candidate = await service.get(this.id)
        const suspendedCount = await service.getSuspensionCount(this.id)
        if (suspendedCount + 1 >= await service.getSuspensionLimit()) {
            candidate.eliminateThisCandidate()
            return CandidateCommandResult.nothing(candidate)
        } else {
            candidate.suspendThisCandidate()
            return CandidateCommandResult.nothing(candidate)
        }
        
    }

    public SuspendOffer(){

        let candidate = new Candidate(
            new CandidateIdVo(),
            new CandidateStateVo(CandidateStatesEnum.Active),
            new CandidateFullNameVo(dto.name, dto.lastname),
            new CandidatePhoneVo(dto.phoneCode, dto.phoneNumber),
            new CandidateEmailVo(dto.email),
            new CandidateBirthDateVo(new Date(dto.birthDate)),
            new CandidateLocationVo(dto.latitude, dto.longitude),
        );

        candidate = candidate.registerCandidate();

        this.repository.save(candidate);

        return candidate
    }
}
*/