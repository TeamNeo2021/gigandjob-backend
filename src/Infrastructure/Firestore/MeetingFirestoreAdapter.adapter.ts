

import { CollectionReference } from '@google-cloud/firestore';
import { Inject } from '@nestjs/common';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IMeetingRepository } from '../../Application/Repositories/MeetingRepository.repo';


//@Injectable()
export class MeeetingFirestoreAdapter implements IMeetingRepository {

    repository :any;
    
    constructor(
        @Inject('meetings') private collection: CollectionReference<MeetingDTO>) {}


    async saveMeeting(meeting: MeetingDTO)/**: Promise<MeetingDTO> */ {
      try {
        let newMeeting = await this.collection.doc(meeting.id).set(
            meeting
        );
        console.log('MeeetingFirestoreAdapter: saveMeeting response: ', newMeeting);
        // let meetingDTO = new MeetingDTO(  newMeeting );
        // return meetingDTO;
      } catch (error) {
          //console.log('MeeetingFirestoreAdapter: Error at saveMeeting: ',error);
          throw new Error('MeeetingFirestoreAdapter: Error at saveMeeting: '+error);
          
      }
    }
    async cancelMeeting(meetingId: string) {
        try {
           let result =  await this.collection.doc(meetingId).update({
                state: MeetingStates.Canceled.toString()
            });
            console.log('MeeetingFirestoreAdapter: cancelMeeting response: ', result);
        } catch (error) {
            //console.log('MeeetingFirestoreAdapter: Error at cancelMeeting: ',error);
            throw new Error('MeeetingFirestoreAdapter: Error at cancelMeeting: '+error);
            
        }
        
    }
    async modifyMeeting(meetingUpdate: ModifyMeetingDTO)/**: Promise<MeetingDTO> */{
        try {
           let updatedMeeting =  await this.collection.doc(meetingUpdate.id).update(meetingUpdate);
           console.log('MeeetingFirestoreAdapter: modifyMeeting response: ', updatedMeeting);
             // return new MeetingDTO(updatedMeeting);
        } catch (error) {
            //console.log('MeeetingFirestoreAdapter: Error at modifyMeeting: ',error);
            throw new Error('MeeetingFirestoreAdapter: Error at modifyMeeting: '+error);
        }
    }
    async getAllCandidateMeetings(candidateId: string): Promise<MeetingDTO[]> {
        try {
                let candidateMeetingDocs = await (await this.collection.where('candidateId', '==', candidateId).get()).docs;
                console.log('MeeetingFirestoreAdapter: getAllCandidateMeetings candidateMeetingDocs: ', candidateMeetingDocs);
                let candidateMeetingsList = candidateMeetingDocs.map(doc => {
                    console.log('getAllCandidateMeetings ...mapping doc: ', doc);
                     return new MeetingDTO(doc.data())
                     });
                console.log('MeeetingFirestoreAdapter: getAllCandidateMeetings candidateMeetingsList: ', candidateMeetingsList);
                return candidateMeetingsList;
        } catch (error) {
            //console.log('MeeetingFirestoreAdapter: Error at getAllCandidateMeetings: ',error);
            throw new Error('MeeetingFirestoreAdapter: Error at getAllCandidateMeetings: '+error);
        }
    }
   async  getAllEmployerMeetings(employerId: string): Promise<MeetingDTO[]> {
        try {
                let employerMeetingDocs = await (await this.collection.where('employerId', '==', employerId).get()).docs;
                console.log('MeeetingFirestoreAdapter: getAllEmployerMeetings employerMeetingDocs: ', employerMeetingDocs);
                let employerMeetingsList = employerMeetingDocs.map(doc => {
                    console.log('getAllEmployerMeetings ...mapping doc: ', doc);
                     return new MeetingDTO(doc.data())
                     });
                console.log('MeeetingFirestoreAdapter: getAllEmployerMeetings employerMeetingsList: ', employerMeetingsList);
                return employerMeetingsList;
        } catch (error) {
            //console.log('MeeetingFirestoreAdapter: Error at getAllEmployerMeetings: ',error);
            throw new Error('MeeetingFirestoreAdapter: Error at getAllEmployerMeetings: '+error);
        }
    }
    async cancelAllEmployerMeetings(employerId: string) {
        try {
            let result =  await this.collection.where('employerId', '==', employerId).get()
            .then(function(querySnapshot) {
                querySnapshot.forEach( (doc) =>{
                    doc.ref.update({
                        state: MeetingStates.Canceled.toString()
                    });
                });
            });
            console.log('MeeetingFirestoreAdapter: cancelAllEmployerMeetings response: ', result);
            
        } catch (error) {
            //console.log('MeeetingFirestoreAdapter: Error at cancelAllEmployerMeetings: ',error);
            throw new Error('MeeetingFirestoreAdapter: Error at cancelAllEmployerMeetings: '+error);
            
        }
    }
   async  cancelAllCandidateMeetings(candidateId: string) {
        try {
            let result =  await this.collection.where('candidateId', '==', candidateId).get()
            .then(function(querySnapshot) {
                querySnapshot.forEach( (doc) =>{
                    doc.ref.update({
                        state: MeetingStates.Canceled.toString()
                    });
                });
            });
            console.log('MeeetingFirestoreAdapter: cancelAllCandidateMeetings response: ', result);
            
            
        } catch (error) {
            //console.log('MeeetingFirestoreAdapter: Error at cancelAllCandidateMeetings: ',error);
            throw new Error('MeeetingFirestoreAdapter: Error at cancelAllCandidateMeetings: '+error);
            
            
        }
    }

  

}