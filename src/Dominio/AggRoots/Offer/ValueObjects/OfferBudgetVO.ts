import { InvalidOfferBudget } from '../Errors/InvalidOfferBudget.error';

export class BudgetVO {
  readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static Create(value: number) {
    if (value == null) {
      throw InvalidOfferBudget.EmptyBugdget();
    }
    if (value < 0) {
      throw InvalidOfferBudget.NegativeBugdget();
    }

    return new BudgetVO(value);
  }

  static Unsafe(value: number) {
    return new BudgetVO(value);
  }
}
