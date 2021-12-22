import { BudgetVO } from "../../AggRoots/Offer/ValueObjects/OfferBudgetVO"


describe("Budget",()=>{
    
       //Validemos nuestro presupuesto
       it("Deberia fallar si el presupuesto es nulo", ()=>{ //Validate que no es vacia
        expect(()=>new BudgetVO(null)).toThrowError(Error)
    }),

    it("Deberia fallar si el presupuesto es menor a 0", ()=>{ //Validate que no es negativa
        expect(()=>new BudgetVO(-231)).toThrowError(Error)
    })

    it("Deberia crear cuando le pase un numero", () => {
        expect(new BudgetVO(5)).toBeInstanceOf(BudgetVO)
    })
})