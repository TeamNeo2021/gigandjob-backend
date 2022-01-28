# Documentation for GigAndJob API

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**candidatesIdReactivatePost**](Apis/DefaultApi.md#candidatesidreactivatepost) | **POST** /candidates/{id}/reactivate | Reactivates a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatesIdSuspendPost**](Apis/DefaultApi.md#candidatesidsuspendpost) | **POST** /candidates/{id}/suspend | Suspends a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatesPost**](Apis/DefaultApi.md#candidatespost) | **POST** /candidates | Registers a new candidate
*DefaultApi* | [**employersPost**](Apis/DefaultApi.md#employerspost) | **POST** /employers | Registers a new employer
*DefaultApi* | [**meetingAcceptPut**](Apis/DefaultApi.md#meetingacceptput) | **PUT** /meeting/accept | Accept a meeting
*DefaultApi* | [**offerEliminitedPut**](Apis/DefaultApi.md#offereliminitedput) | **PUT** /offer/Eliminited | Eliminates an offer
*DefaultApi* | [**offerIdReportPost**](Apis/DefaultApi.md#offeridreportpost) | **POST** /offer/{id}/report | Reports an offer
*DefaultApi* | [**offerPost**](Apis/DefaultApi.md#offerpost) | **POST** /offer | Creates a new offer
*DefaultApi* | [**offerReactivedPut**](Apis/DefaultApi.md#offerreactivedput) | **PUT** /offer/Reactived | Reactivates an offer


<a name="documentation-for-models"></a>
## Documentation for Models

 - [CandidateRegistrationForm](./Models/CandidateRegistrationForm.md)
 - [CandidateSuspensionForm](./Models/CandidateSuspensionForm.md)
 - [EmployerRegistrationForm](./Models/EmployerRegistrationForm.md)
 - [MeetingAcceptanceForm](./Models/MeetingAcceptanceForm.md)
 - [OfferIdForm](./Models/OfferIdForm.md)
 - [OfferRegistrationForm](./Models/OfferRegistrationForm.md)
 - [OfferReportInformation](./Models/OfferReportInformation.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

All endpoints do not require authorization.
