import { InvalidOfferBudget } from "../Errors/InvalidOfferBudget.error";

export class BudgetVO {
    private readonly value: number;
  
    constructor(value: number) {
        if (value == null) {
            throw InvalidOfferBudget.EmptyBugdget();
        }
        if (value < 0) {
            throw InvalidOfferBudget.NegativeBugdget();
        }
      this.value = value;
    }

  }