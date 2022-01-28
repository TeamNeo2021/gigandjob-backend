import { InvalidEmployerComercialDesignation } from "../Errors/InvalidEmployerComercialDesignation.error";

export class EmployerComercialDesignationVO {
    value_comercial_designation: string;

    private constructor() {}

    static Create(value: string) {
      const des = new EmployerComercialDesignationVO() 
      if (!value || value.trim() == "") {
        throw InvalidEmployerComercialDesignation.EmptyComercialDesignation()
      }
      if (value.length > 100) {
        throw InvalidEmployerComercialDesignation.TooBigComercialDesignation();
      }
      des.value_comercial_designation = value;
      return des
    }

    static Unsafe(value: string) {
      const des = new EmployerComercialDesignationVO() 
      des.value_comercial_designation = value;
      return des
    }
  }