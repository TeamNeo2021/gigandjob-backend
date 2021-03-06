import { InvalidOfferBudget } from "../../AggRoots/Offer/Errors/InvalidOfferBudget.error"
import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO"


describe("Budget",()=>{
    
       //Validemos nuestro presupuesto
       it("Deberia fallar si el presupuesto es nulo", ()=>{ //Validate que no es vacia
        expect(()=>BudgetVO.Create(null)).toThrowError(InvalidOfferBudget)
    }),

    it("Deberia fallar si el presupuesto es menor a 0", ()=>{ //Validate que no es negativa
        expect(()=>BudgetVO.Create(-231)).toThrowError(InvalidOfferBudget)
    })

    it("Deberia crear cuando le pase un numero", () => {
        expect(BudgetVO.Create(5)).toBeInstanceOf(BudgetVO)
    })
})