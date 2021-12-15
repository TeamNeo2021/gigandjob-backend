class EmployeRegistered {
  public Name: string;
  public Description: string;
  public Location: string;
  public Rif: string;
  public Phone: string;
  public Mail: string;
  public ComDesignation: string;

  constructor(
    Name: string,
    Description: string,
    Location: string,
    Rif: string,
    Phone: string,
    Mail: string,
    ComDesignation: string,
  ) {
    this.Name = Name;
    this.Description = Description;
    this.Location = Location;
    this.Rif = Rif;
    this.Phone = Phone;
    this.Mail = Mail;
    this.ComDesignation = ComDesignation;
  }
}
