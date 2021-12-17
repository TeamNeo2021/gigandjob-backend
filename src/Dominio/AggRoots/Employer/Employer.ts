import { IDomainEvent } from 'src/Dominio/DomainEvents/IDomainEvent';
import { IDomainEventHandler } from 'src/Dominio/DomainEvents/IDomainEventHandler';
import { IInternalEventHandler } from '../IInternalEventHandler';
import { AggregateRoot } from '../AggregateRoot';
import { EmployerRegisteredHandler } from '../../DomainEvents/EmployerRegisteredHandler';
import { EmployerRegistered } from '../../DomainEvents/EmployerRegistered';
import { EmployerNameVo } from './ValueObjects/EmployerNameVo';
import { EmployerStateVo } from './ValueObjects/EmployerStateVo';
import { EmployerIdVO } from './ValueObjects/EmployerIdVO';

export class Employer extends AggregateRoot {
 
  private EmployerId: EmployerIdVO;
  private _Name: EmployerNameVo;
  private _Description: string;
  private _State: EmployerStateVo;
  private Location: string;
  private Rif: string;
  private Phone: string;
  private Mail: string;
  private ComDesignation: string;
  constructor(applier: any) {
    super(applier);
    //Por ahora ya que no se han implementdo los value objects
    this.EmployerId = new EmployerIdVO(Date().toString());
  }
 
  protected EnsureValidState(): void {
    const valid = this.EmployerId != null && this._Name != null; /*&&
      
      Comentaré esto por ahora ya que no se han implementado los demás value objects
      this.Rif != null &&
      this.Location != null &&
      this.Phone != null &&
      this.Mail != null &&
      this.ComDesignation != null;*/
    if (!valid) {
      throw new Error('Verificacion de estado ha fallado, estado inválido');
    }
  }

  public RegistrarEmpleado(
    Name: string,
    Description: string,
    State: number,
    Location: string,
    Rif: string,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    console.log('RE');
    this.Apply(
      new EmployerRegistered(
        Name,
        Description,
        State,
        Location,
        Rif,
        Phone,
        Mail,
        ComDesignation,
      ),
      new EmployerRegisteredHandler(),
    );
  }

  //Getters y setters
  public get Name(): EmployerNameVo {
    return this._Name;
  }
  public set Name(value: EmployerNameVo) {
    this._Name = value;
  }

  public get Description(): string {
    return this._Description;
  }
  public set Description(value: string) {
    this._Description = value;
  }
  public get State(): EmployerStateVo {
    return this._State;
  }
  public set State(value: EmployerStateVo) {
    this._State = value;
  }


  protected when(event: IDomainEvent, handler: IDomainEventHandler) {
    throw new Error('Method not implemented.');
  }
}
