class Employer extends AggregateRoot implements IInternalEventHandler {
  private Name: EmployerNameVo;
  private Description: string;
  private Location: string;
  private Rif: string;
  private Phone: string;
  private Mail: string;
  private ComDesignation: string;

  constructor() {
    super();
  }
  protected When(event: object): void {
    switch (event) {
      case EmployeRegistered:
        this.Name = new EmployerNameVo(event[1]);
        break;
    }
  }
  protected EsureValidState(): void {
    throw new Error('Method not implemented.');
  }

  public RegistrarEmpleado(
    Name: string,
    Description: string,
    Location: string,
    Rif: string,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    this.Apply(
      new EmployeRegistered(
        Name,
        Description,
        Location,
        Rif,
        Phone,
        Mail,
        ComDesignation,
      ),
    );
  }
}
