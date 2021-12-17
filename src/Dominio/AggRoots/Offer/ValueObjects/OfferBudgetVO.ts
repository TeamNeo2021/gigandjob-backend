export class BudgetVO {
    private readonly value: number;
  
    constructor(value: number) {
        if (value == null) {
            throw new Error('ERROR: El presupuesto está vacío');
        }
        if (value < 0) {
            throw new Error('ERROR: El presupuesto no debe ser menor a 0');
        }
      this.value = value;
    }

  }