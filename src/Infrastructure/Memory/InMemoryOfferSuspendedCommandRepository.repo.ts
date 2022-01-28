import { count } from 'console';
import { SystemOfferSuspensionRespository } from 'src/Application/Repositories/Offer/Suspensions/repository.interface';
import { Offer } from 'src/Dominio/AggRoots/Offer/Offer';


export class InMemoryOfferSuspensionCommandRepository
  implements SystemOfferSuspensionRespository
{
  private Offers: Offer[] = [];

  async getApplicationsToOfferCount(id: string): Promise<number> {
    let count: number;
      for (const iterator of this.Offers) {
          if(iterator._Id.value == id){
            count = iterator._application.length;
            break
          }
      }

      return count;
  }
  async get_publicationDate(id: string): Promise<Date> {
    let publishdate: Date;
    for (const iterator of this.Offers) {
        if(iterator._Id.value == id){
            publishdate = iterator._PublicationDate.value;
          break
        }
    }

    return publishdate;
  }

}