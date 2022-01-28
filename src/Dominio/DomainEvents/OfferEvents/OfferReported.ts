import { OfferReportVO } from "src/Dominio/AggRoots/Offer/ValueObjects/OfferReportVO";

export class OfferReported {
    constructor(
        public report: OfferReportVO
    ) {}
}