import { randomUUID } from "crypto";
import { CandidateApplied } from "../../../DomainEvents/CandidateEvents/CandidateApplied";
import { Candidate } from "../../../AggRoots/Candidate/Candidate";
import { CandidateBirthDateVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateBirthDateVo";
import { CandidateEmailVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateEmailVo";
import { CandidateFullNameVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateFullNameVo";
import { CandidateIdVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { CandidateLocationVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateLocationVO";
import { CandidatePhoneVo } from "../../../AggRoots/Candidate/ValueObjects/CandidatePhoneVo";
import { CandidateStatesEnum, CandidateStateVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateStateVo";
import { Application } from "../../../AggRoots/Offer/Application/Application";
import { ApplicationBudget } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationBudget";
import { ApplicationDescription } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationDescription";
import { ApplicationId } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationId";
import { ApplicationState } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationStates";
import { ApplicationTime } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationTime";
import { Offer } from "../../../AggRoots/Offer/Offer";
import { BudgetVO } from "../../../AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "../../../AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { OfferLocationVO } from "../../../AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "../../../AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "../../../AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "../../../AggRoots/Offer/ValueObjects/OfferRatingVO";
import { ApplyToOffer } from "../../../DomainService/ApplyToOffer";
import { OfferStatesEnum, OfferStateVO } from "../../../AggRoots/Offer/ValueObjects/OfferStateVo";
import { Sectors, SectorVO } from "../../../AggRoots/Offer/ValueObjects/OfferSectorVo";


const exampleApplier: Function = () => { };
const exampleBudget: number = 500;
const exampleDescription: string = 'Hi im a perfect description';
const exampleTimeInDays: number = 10;
const exampleOverflowedDescription: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac porttitor justo, eu maximus sapien. Morbi ante quam, condimentum a odio eu, molestie sodales turpis. Etiam nec nisl ut urna semper volutpat sed vitae metus. Quisque arcu sem, ornare vel mattis quis, eleifend at ex. Nulla facilisi. Aenean vel efficitur quam, et tempus dolor. Phasellus non ex mollis, tempor felis a, dapibus diam. Ut a tellus quis urna feugiat tincidunt. Pellentesque congue ligula nec laoreet tempus. Quisque ac purus euismod, consequat risus non, porttitor odio. Vivamus sagittis massa in urna pretium mollis. Praesent ante mi, porta ornare semper non, tristique.'


const exampleOffer = new Offer(
    new OfferIdVO(randomUUID()),
    new OfferStateVO(OfferStatesEnum.Active),
    PublicationDateVO.Create(new Date()),
    RatingVO.Create(0),
    new OfferLocationVO(50,120),
    new SectorVO(Sectors.Laws),
    BudgetVO.Create(400),
    DescriptionVO.Create('Oferta de prueba')

)

const exampleCandidate = new Candidate(
    new CandidateIdVo(),
    new CandidateStateVo(CandidateStatesEnum.Active),
    new CandidateFullNameVo('Peter', 'Parker'),
    new CandidatePhoneVo('0414', '4407938'),
    new CandidateEmailVo('spidey@gmail.com'),
    new CandidateBirthDateVo(new Date('2000-01-16')),
    new CandidateLocationVo(20, 90)
);


const exampleApplication = new Application(
    exampleApplier,
    new ApplicationId(randomUUID()),
    new CandidateIdVo(),
    new ApplicationState(),
    new ApplicationBudget(exampleBudget),
    new ApplicationDescription(exampleDescription),
    new ApplicationTime(exampleTimeInDays)
);

const Service = new ApplyToOffer(
    exampleCandidate,
    exampleOffer,
    exampleBudget,
    exampleDescription,
    exampleTimeInDays);


describe('Creating application', () => {

    it('should succeed when entering valid data', () => {
        expect(() => {
            Service.createApplication();
        }).not.toThrow(Error);
    })
    it('should add a new application to the application`s array in offer', () => {
        Service.createApplication();
        let applications = exampleOffer._application;
        let last = applications.length - 1
        expect(applications[last]).toBeInstanceOf(Application)
    });
    it('should add a new CandidateApplied event to the offer', () => {
        Service.createApplication();
        let events = exampleOffer.GetChanges();
        let last = events.length - 1
        expect(events[last]).toBeInstanceOf(CandidateApplied)
    });

})
