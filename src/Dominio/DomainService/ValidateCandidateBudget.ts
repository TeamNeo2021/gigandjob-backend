import { Candidate } from '../AggRoots/Candidate/Candidate';
import { Application } from '../AggRoots/Offer/Application/Application';

export class ValidateCandidateBudget {
  validate(apply: Application): boolean {
    if (apply.getBudget.value <= 0 || isNaN(apply.getBudget.value)) {
      return false;
    } else {
      return true;
    }
  }
}
