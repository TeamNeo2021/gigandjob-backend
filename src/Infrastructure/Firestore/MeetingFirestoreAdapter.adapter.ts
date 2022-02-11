import { CollectionReference } from '@google-cloud/firestore';
import { Inject, Injectable } from '@nestjs/common';
import { CandidateDTO } from 'src/Application/DTO/Candidate/Candidate.dto';
import { EmployerDTO } from 'src/Application/DTO/Employer/Employer.dto';
import { MeetingDTO } from 'src/Application/DTO/Meeting/Meeting.dto';
import { ModifyMeetingDTO } from 'src/Application/DTO/Meeting/modifyMeetingDTO';
import { MeetingStates } from 'src/Dominio/AggRoots/Meeting/ValueObjects/MeetingStateVO';
import { IMeetingRepository } from '../../Application/Repositories/MeetingRepository.repo';

type MeetingDataModel = {
    [P in keyof MeetingDTO]: 
        P extends "location" ? { latitude: number, longitude: number } : 
        MeetingDTO[P] extends Date ? Date :
        MeetingDTO[P] extends object ? string : 
        MeetingDTO[P]
}

@Injectable()
export class MeetingFirestoreAdapter implements IMeetingRepository {

    repository :any;
    
    constructor(
        @Inject('Meetings') private collection: CollectionReference<MeetingDataModel>,
        @Inject('employers') private ecollection: CollectionReference<EmployerDTO>,
        @Inject('candidates') private ccollection: CollectionReference<any>,
    ) {}

    private async dataModelToDTO(meetingData: MeetingDataModel) {
        const employerQuery = await this.ecollection.doc(meetingData.employer).get(),
              employerData = employerQuery.data(),
              candidateQuery = await this.ccollection.doc(meetingData.candidate).get(),
              candidateData = candidateQuery.data();

              console.log(candidateData)
        return new MeetingDTO({
            ...meetingData,
            date: (meetingData.date as any).toDate(),
            employer: new EmployerDTO(employerData),
            candidate: new CandidateDTO({
                candidateId: candidateData.id,
                state: candidateData.state,
                name: candidateData.name.names,
                lastname: candidateData.name.lastname,
                phone: candidateData.phone.areaCode + candidateData.phone.phoneNumber,
                email: candidateData.email,
                birthdate: new Date(candidateData.birthdate),
                location: candidateData.location
            })
        });
    }

    async getById(id: string): Promise<MeetingDTO> {
        const meetingQuery = await this.collection.doc(id).get();
        console.log(meetingQuery.data())
        const meetingData = meetingQuery.data()
        
            
        return await this.dataModelToDTO(meetingData)
    }


    async saveMeeting(meeting: MeetingDTO)/**: Promise<MeetingDTO> */ {
      try {
        let newMeeting = await this.collection.doc(meeting.id).set({ 
            ...meeting, 
            location: { 
               latitude: meeting.location.latitude.valueOf(),
               longitude: meeting.location.longitude.valueOf()
            },
            candidate: typeof meeting.candidate == "string" ? meeting.candidate : meeting.candidate.candidateId.valueOf(),
            employer: typeof meeting.employer == "string" ? meeting.employer : meeting.employer.employerId.valueOf()
        });
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
           let updatedMeeting =  await this.collection.doc(meetingUpdate.id).update({
                ...meetingUpdate,
                location: {
                    latitude: meetingUpdate.location.latitude.valueOf(),
                    longitude: meetingUpdate.location.longitude.valueOf()
                },
           });
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
                let candidateMeetingsList = await Promise.all(candidateMeetingDocs.map(async doc => {
                    console.log('getAllCandidateMeetings ...mapping doc: ', doc);
                    return await this.dataModelToDTO(doc.data())  
                }));
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
                let employerMeetingsList = await Promise.all(employerMeetingDocs.map(async doc => {
                    console.log('getAllEmployerMeetings ...mapping doc: ', doc);
                    return await this.dataModelToDTO(doc.data())
                }));
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