import { application } from 'express';
import { ApplicationStates } from '../AggRoots/Offer/Application/Value Objects/ApplicationStates';
import { Offer } from '../AggRoots/Offer/Offer';

export class ApplicantHired {
  CandidateContract(offer: Offer) {
    offer._application.forEach((application) => {
      application.setState(ApplicationStates.Inactive);
    });
    offer.EliminateOffer();
  }
}
