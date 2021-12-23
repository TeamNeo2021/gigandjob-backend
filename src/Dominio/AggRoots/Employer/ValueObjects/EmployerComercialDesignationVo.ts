import { InvalidEmployerComercialDesignation } from "../Errors/InvalidEmployerComercialDesignation.error";

export class EmployerComercialDesignationVO {
    value_comercial_designation: string;
    constructor(value: string) {
      if (!value || value.trim() == "") {
        throw InvalidEmployerComercialDesignation.EmptyComercialDesignation()
      }
      if (value.length > 100) {
        throw InvalidEmployerComercialDesignation.TooBigComercialDesignation();
      }
      this.value_comercial_designation = value;
    }
  }