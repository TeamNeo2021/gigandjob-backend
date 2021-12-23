export class InvalidOfferBudget extends Error {
  
    static EmptyBugdget() {
        return new InvalidOfferBudget("ERROR: El presupuesto está vacío")
    }

    static NegativeBugdget() {
        return new InvalidOfferBudget("ERROR: El presupuesto no debe ser menor a 0")
    }
}