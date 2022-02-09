import { InvalidReporterIdError } from '../Errors/InvalidReporterId.error';
import { InvalidReportReasonError } from '../Errors/InvalidReportReason.error';

const UUID_FORMAT =
  /([0-9]|[a-f]){8,8}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){4,4}-([0-9]|[a-f]){12,12}/g;

export class OfferReportVO {
  private constructor(
    public readonly reporterId: string,
    public readonly reason: string,
  ) {}

  static Create(reporterId: string, reason: string) {
    if (
      !reporterId ||
      reporterId.trim() == '' ||
      !reporterId.match(UUID_FORMAT) ||
      reporterId.match(UUID_FORMAT).length == 0
    ) {
      throw new InvalidReporterIdError(reporterId);
    }
    if (reason.trim() == '' || reason.length >= 255) {
      throw new InvalidReportReasonError(reason);
    }
    return new OfferReportVO(reporterId, reason);
  }

  static Unsafe(reporterId: string, reason: string) {
    return new OfferReportVO(reporterId, reason);
  }
}
