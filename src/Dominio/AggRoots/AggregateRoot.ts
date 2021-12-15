abstract class AggregateRoot implements IInternalEventHandler {
  public tid: string;
  private readonly changes: Array<object>;
  protected constructor() {
    this.changes = new Array<object>();
  }
  protected abstract When(event: object): void;
  protected abstract EsureValidState(): void;
  protected Apply(event: Object): void {
    this.When(event);
    this.EsureValidState();
    this.changes.push(event);
  }
  public GetChanges() {
    return this.changes;
  }
  public ClearChanges(): void {
    this.changes.splice(0, this.changes.length);
  }
  protected ApplyToEntity(entity: IInternalEventHandler, event: Object): void {
    entity.Handle(event);
  }
  public Handle(event: object): void {
    this.When(event);
  }
}
