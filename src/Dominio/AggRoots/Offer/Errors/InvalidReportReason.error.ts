export class InvalidReportReasonError extends Error {
  constructor(reason: string) {
    super(`Invalid report reason: ${reason}`);
  }
}
