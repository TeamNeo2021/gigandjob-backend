import { randomUUID } from "crypto";
import { CandidateIdVo } from "../../../AggRoots/Candidate/ValueObjects/CandidateIdVo";
import { Application } from "../../../AggRoots/Offer/Application/Application"
import { ApplicationBudget } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationBudget";
import { ApplicationDescription } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationDescription";
import { ApplicationId } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationId";
import { ApplicationState, ApplicationStates } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationStates";
import { ApplicationTime } from "../../../AggRoots/Offer/Application/Value Objects/ApplicationTime";


const exampleApplier: Function = ()=>{};
const exampleBudget: number = 500;
const exampleDescription: string = 'Hi im a perfect description';
const exampleTimeInDays: number = 10;
const exampleOverflowedDescription: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac porttitor justo, eu maximus sapien. Morbi ante quam, condimentum a odio eu, molestie sodales turpis. Etiam nec nisl ut urna semper volutpat sed vitae metus. Quisque arcu sem, ornare vel mattis quis, eleifend at ex. Nulla facilisi. Aenean vel efficitur quam, et tempus dolor. Phasellus non ex mollis, tempor felis a, dapibus diam. Ut a tellus quis urna feugiat tincidunt. Pellentesque congue ligula nec laoreet tempus. Quisque ac purus euismod, consequat risus non, porttitor odio. Vivamus sagittis massa in urna pretium mollis. Praesent ante mi, porta ornare semper non, tristique.'


const exampleApplication = new Application(
    exampleApplier,
    new ApplicationId(randomUUID()),
    new CandidateIdVo(),
    new ApplicationState(),
    new ApplicationBudget(exampleBudget),
    new ApplicationDescription(exampleDescription),
    new ApplicationTime(exampleTimeInDays)
)

describe('Creating an application', () => {
    it('should fail when empty id is generated',()=>{
        const id = new ApplicationId(randomUUID())
        expect(()=>
        id !== null &&
        id.value !== null && 
        id.value !== undefined && 
        id.value !== '');
    });
    it('should fail when empty Candidate id is generated',()=>{
        const candidateId = new CandidateIdVo();
        expect(()=>
        candidateId !== null &&
        candidateId.value !== null &&
        candidateId.value !== undefined &&
        candidateId.value !== '')
    });
    it('should fail when an invalid state is supplied',()=>{
        const state = new ApplicationState()
        expect(()=> state.current in ApplicationStates)
    });
    it('should fail when null budget amount is supplied',()=>{
        expect(()=> new ApplicationBudget(null)).toThrowError(TypeError)
    });
    it('should fail when budget is below zero',()=>{
        expect(()=> new ApplicationBudget(-1)).toThrowError(RangeError)
    });
    it('should fail when budget is zero',()=>{
        expect(()=> new ApplicationBudget(0)).toThrowError(RangeError)
    });
    it('should fail when null description is supplied',()=>{
        expect(()=>new ApplicationDescription(null)).toThrowError(TypeError)
    });
    it('should fail when description is larger than 500 characters',()=>{
        expect(()=>new ApplicationDescription(exampleOverflowedDescription)).toThrowError(RangeError)
    });
    it('should fail when null time is supplied',()=>{
        expect(()=> new ApplicationTime(null)).toThrowError(TypeError)
    });
    it('should fail when time in days is below zero',()=>{
        expect(()=> new ApplicationTime(-1)).toThrowError(RangeError)
    });
    it('should fail when budget is zero',()=>{
        expect(()=> new ApplicationTime(0)).toThrowError(RangeError)
    });
})
