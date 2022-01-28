export interface SystemOfferSuspensionRespository {
    getApplicationsToOfferCount(id: string): Promise<number>,
    get_publicationDate(id: string): Promise<Date>
}