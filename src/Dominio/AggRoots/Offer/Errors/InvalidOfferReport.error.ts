export class InvalidOfferReportError extends Error {
    static reportedEliminatedOffer(id: string) {
        return new InvalidOfferReportError(`Tried to report offer: ${id}, but it was already eliminated`)
    }
    static reportedSuspendedOffer(id: string) {
        return new InvalidOfferReportError(`Tried to report offer: ${id}, but it was already suspended`)
    }
    static alreadyReportedOffer(id: string) {
        return new InvalidOfferReportError(`Tried to report offer: ${id}, but it was already reported by the reporting user`)
    }
}