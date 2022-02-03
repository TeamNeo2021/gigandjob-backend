import { CollectionReference } from "@google-cloud/firestore"
import { Inject, NotFoundException } from "@nestjs/common"
import { IApplicationRepository } from "src/Application/Repositories/ApplicationRepository.repo"
import { ApplicationStates } from "src/Dominio/AggRoots/Offer/Application/Value Objects/ApplicationStates";

class ApplicationFirestoreAdapter implements IApplicationRepository{   //todo Delete this, this goes in OfferFirestoreAdapter
    constructor(
        @Inject
        ('applications') private collection: CollectionReference<ApplyToOfferDTO>
        ){}


   
    // async newApllication(application: ApplyToOfferDTO): Promise<void> {
    //    try {
    //     let result = await this.collection.doc(application.applicationId).set(application);
    //     console.log
    //    } catch (error) {
           
    //    }
    // }

    async cancelApplication(application_id: string) {
        try {
            let result =  await this.collection.doc(application_id).update({
                 state: ApplicationStates.Canceled.toString()
             });
            
             console.log('MeeetingFirestoreAdapter: cancelMeeting response: ', result);
             return result;
        } catch (error) {
            console.log('MeeetingFirestoreAdapter: cancelMeeting error: ', error);
        }
    }

    async findById(applicationId: string): Promise<ApplyToOfferDTO> {
        try {
        const result = await this.collection.doc(applicationId).get();

        if(!result.exists) {
            throw new NotFoundException(`Application with id ${applicationId} not found`)
        }
        console.log()
        return new ApplyToOfferDTO(result.data());
            
        } catch (error) {
            console.log('MeeetingFirestoreAdapter: findById error: ', error);
            
        }
    }
    async findAll(): Promise<ApplyToOfferDTO[]> {
       try {
        const result = await this.collection.get();
        console.log('MeeetingFirestoreAdapter: findAll response: ', result);
        const applicationsList =  result.docs.map(doc => new ApplyToOfferDTO(doc.data()));
        console.log('MeeetingFirestoreAdapter: findAll applicationsList: ', applicationsList);
        return applicationsList;
       } catch (error) {
              console.log('MeeetingFirestoreAdapter: findAll error: ', error);
           
       }
    }
}