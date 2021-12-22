import { randomUUID } from "crypto";
import { CandidateIdVo } from "src/Dominio/AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { Application } from "src/Dominio/AggRoots/Offer/Application/Application";
import { ApplicationBudget } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationBudget";
import { ApplicationDescription } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationDescription";
import { ApplicationId } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationId";
import { ApplicationState } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates";
import { ApplicationTime } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationTime";
import { Offer } from "src/Dominio/AggRoots/Offer/Offer";
import { BudgetVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferBudgetVO";
import { DescriptionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDescriptionVO";
import { DirectionVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferDirectionVO";
import { OfferIdVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferIdVO";
import { PublicationDateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferPublicationDateVO";
import { RatingVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferRatingVO";
import { Sectors, SectorVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferSectorVO";
import { OfferStatesEnum, OfferStateVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferStateVO";


const exampleApplier: Function = ()=>{};
const exampleBudget: number = 500;
const exampleDescription: string = 'Hi im a perfect description';
const exampleTimeInDays: number = 10;
const exampleOverflowedDescription: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac porttitor justo, eu maximus sapien. Morbi ante quam, condimentum a odio eu, molestie sodales turpis. Etiam nec nisl ut urna semper volutpat sed vitae metus. Quisque arcu sem, ornare vel mattis quis, eleifend at ex. Nulla facilisi. Aenean vel efficitur quam, et tempus dolor. Phasellus non ex mollis, tempor felis a, dapibus diam. Ut a tellus quis urna feugiat tincidunt. Pellentesque congue ligula nec laoreet tempus. Quisque ac purus euismod, consequat risus non, porttitor odio. Vivamus sagittis massa in urna pretium mollis. Praesent ante mi, porta ornare semper non, tristique.'


const exampleOffer = new Offer(
    new OfferIdVO(' '),
    new OfferStateVO(OfferStatesEnum.Active),
    new PublicationDateVO(new Date()),
    new RatingVO(0),
    new DirectionVO('direction'),
    new SectorVO(Sectors.Laws),
    new BudgetVO(400),
    new DescriptionVO(' ')

)


const exampleApplication = new Application(
    exampleApplier,
    new ApplicationId(randomUUID()),
    new CandidateIdVo(),
    new ApplicationState(),
    new ApplicationBudget(exampleBudget),
    new ApplicationDescription(exampleDescription),
    new ApplicationTime(exampleTimeInDays)
);