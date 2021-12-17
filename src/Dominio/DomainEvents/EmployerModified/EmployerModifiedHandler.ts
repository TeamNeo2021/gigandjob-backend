import { Employer } from "src/Dominio/AggRoots/Employer/Employer";
import { EmployerNameVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerNameVo";
import { EmployerStateVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerStateVo";
//import { EmployerDescriptionVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerDescriptionVO";
//import { EmployerLocationVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerLocationVO";
//import { EmployerRifVO } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerRifVO";
import { IDomainEventHandler } from "../IDomainEventHandler";
import { EmployerModified } from "./EmployerModified";
//import { EmployerMailVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerMailVo";
import { EmployerComercialDesignationVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerComercialDesignationVo";
//import { EmployerPhoneVo } from "src/Dominio/AggRoots/Employer/ValueObjects/EmployerPhoneVo";

export class EmployerModifiedHandler implements IDomainEventHandler {
    handle(event: EmployerModified, entity: Employer): void {
      //entity.Name = new EmployerNameVo(event.Name);
      //entity.Description = new EmployerDescriptionVO (event.Description);
      //entity.State = new EmployerStateVo(event.State);
      //entity.Location = new EmployerLocationVO (event.Location);
      //entity.Rif = new EmployerRifVO(event.Rif);
      //entity.Phone = new EmployerPhoneVo(event.Phone);
      //entity.Mail = new EmployerMailVo(event.Phone);
      //entity.ComDesignation = new EmployerComercialDesignationVo(event.ComDesignation);

    }
  }