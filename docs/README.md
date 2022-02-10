# Documentation for GigAndJob API

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**authLoginPost**](Apis/DefaultApi.md#authloginpost) | **POST** /auth/login | Logs in a Candidate given an email and password
*DefaultApi* | [**cVPost**](Apis/DefaultApi.md#cvpost) | **POST** /CV | Registers a new CV of a candidate
*DefaultApi* | [**candidatesIdDelete**](Apis/DefaultApi.md#candidatesiddelete) | **DELETE** /candidates/{id} | Deletes a candidate
*DefaultApi* | [**candidatesIdReactivatePost**](Apis/DefaultApi.md#candidatesidreactivatepost) | **POST** /candidates/{id}/reactivate | Reactivates a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatesIdSuspendPost**](Apis/DefaultApi.md#candidatesidsuspendpost) | **POST** /candidates/{id}/suspend | Suspends a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatesPost**](Apis/DefaultApi.md#candidatespost) | **POST** /candidates | Registers a new candidate
*DefaultApi* | [**employersEliminatedPut**](Apis/DefaultApi.md#employerseliminatedput) | **PUT** /employers/Eliminated | Elimina un Empleador
*DefaultApi* | [**employersPost**](Apis/DefaultApi.md#employerspost) | **POST** /employers | Registers a new employer
*DefaultApi* | [**employersReactivatedPut**](Apis/DefaultApi.md#employersreactivatedput) | **PUT** /employers/Reactivated | Reactiva un Empleador
*DefaultApi* | [**meetingAcceptPut**](Apis/DefaultApi.md#meetingacceptput) | **PUT** /meeting/accept | Accept a meeting
*DefaultApi* | [**offerEliminitedPut**](Apis/DefaultApi.md#offereliminitedput) | **PUT** /offer/Eliminited | Eliminates an offer
*DefaultApi* | [**offerIdReportPost**](Apis/DefaultApi.md#offeridreportpost) | **POST** /offer/{id}/report | Reports an offer
*DefaultApi* | [**offerPost**](Apis/DefaultApi.md#offerpost) | **POST** /offer | Creates a new offer
*DefaultApi* | [**offerReactivedPut**](Apis/DefaultApi.md#offerreactivedput) | **PUT** /offer/Reactived | Reactivates an offer


<a name="documentation-for-models"></a>
## Documentation for Models

 - [CVSubmitForm](./Models/CVSubmitForm.md)
 - [CVSubmitForm_studies](./Models/CVSubmitForm_studies.md)
 - [CVSubmitForm_workExperiences](./Models/CVSubmitForm_workExperiences.md)
 - [CandidateRegistrationForm](./Models/CandidateRegistrationForm.md)
 - [CandidateSuspensionForm](./Models/CandidateSuspensionForm.md)
 - [EmployerRegistrationForm](./Models/EmployerRegistrationForm.md)
 - [EmployerStateChangeInformation](./Models/EmployerStateChangeInformation.md)
 - [MeetingAcceptanceForm](./Models/MeetingAcceptanceForm.md)
 - [OfferIdForm](./Models/OfferIdForm.md)
 - [OfferRegistrationForm](./Models/OfferRegistrationForm.md)
 - [OfferReportInformation](./Models/OfferReportInformation.md)
 - [inline_response_200](./Models/inline_response_200.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="BasicAuth"></a>
### BasicAuth

- **Type**: HTTP basic authentication

<a name="BearerAuth"></a>
### BearerAuth

- **Type**: HTTP basic authentication

