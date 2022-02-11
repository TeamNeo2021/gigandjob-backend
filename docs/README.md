# Documentation for GigAndJob API

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**authLoginPost**](Apis/DefaultApi.md#authloginpost) | **POST** /auth/login | Logs in a Candidate given an email and password
*DefaultApi* | [**authLogoutPost**](Apis/DefaultApi.md#authlogoutpost) | **POST** /auth/logout | Logs out a Candidate given a JWT
*DefaultApi* | [**cVPost**](Apis/DefaultApi.md#cvpost) | **POST** /CV | Registers a new CV of a candidate
*DefaultApi* | [**candidateIdDelete**](Apis/DefaultApi.md#candidateiddelete) | **DELETE** /Candidate/{id} | Deletes a candidate
*DefaultApi* | [**candidateIdReactivatePost**](Apis/DefaultApi.md#candidateidreactivatepost) | **POST** /Candidate/{id}/reactivate | Reactivates a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidateIdSuspendPost**](Apis/DefaultApi.md#candidateidsuspendpost) | **POST** /Candidate/{id}/suspend | Suspends a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatePost**](Apis/DefaultApi.md#candidatepost) | **POST** /Candidate | Registers a new candidate
*DefaultApi* | [**candidateProfileGet**](Apis/DefaultApi.md#candidateprofileget) | **GET** /Candidate/profile | Gets the data of the current logged in Candidate
*DefaultApi* | [**dashboardGet**](Apis/DefaultApi.md#dashboardget) | **GET** /dashboard | Read-Side for dashboard
*DefaultApi* | [**employersIdDelete**](Apis/DefaultApi.md#employersiddelete) | **DELETE** /employers/:id | Deletes an Employer
*DefaultApi* | [**employersPost**](Apis/DefaultApi.md#employerspost) | **POST** /employers | Registers a new employer
*DefaultApi* | [**employersReactivatedPut**](Apis/DefaultApi.md#employersreactivatedput) | **PUT** /employers/Reactivated | Reactiva un Empleador
*DefaultApi* | [**meetingAcceptPut**](Apis/DefaultApi.md#meetingacceptput) | **PUT** /meeting/accept | Accept a meeting
*DefaultApi* | [**meetingIdGetallGet**](Apis/DefaultApi.md#meetingidgetallget) | **GET** /meeting/{id}/getall | Gets all meetings of a Candidate
*DefaultApi* | [**meetingPost**](Apis/DefaultApi.md#meetingpost) | **POST** /meeting | Creates a meeting
*DefaultApi* | [**meetingRejectPut**](Apis/DefaultApi.md#meetingrejectput) | **PUT** /meeting/reject | Reject a meeting
*DefaultApi* | [**offerApplyToOfferPut**](Apis/DefaultApi.md#offerapplytoofferput) | **PUT** /offer/applyToOffer | Applies to an offer
*DefaultApi* | [**offerEliminitedPut**](Apis/DefaultApi.md#offereliminitedput) | **PUT** /offer/Eliminited | Eliminates an offer
*DefaultApi* | [**offerGetallGet**](Apis/DefaultApi.md#offergetallget) | **GET** /offer/getall | Gets all registered offers
*DefaultApi* | [**offerIdGetoneGet**](Apis/DefaultApi.md#offeridgetoneget) | **GET** /offer/{id}/getone | Gets a existing offer
*DefaultApi* | [**offerIdReportPost**](Apis/DefaultApi.md#offeridreportpost) | **POST** /offer/{id}/report | Reports an offer
*DefaultApi* | [**offerLikeOfferPut**](Apis/DefaultApi.md#offerlikeofferput) | **PUT** /offer/likeOffer | Likes an offer
*DefaultApi* | [**offerPost**](Apis/DefaultApi.md#offerpost) | **POST** /offer | Creates a new offer
*DefaultApi* | [**offerReactivedPut**](Apis/DefaultApi.md#offerreactivedput) | **PUT** /offer/Reactived | Reactivates an offer


<a name="documentation-for-models"></a>
## Documentation for Models

 - [CVSubmitForm](./Models/CVSubmitForm.md)
 - [CVSubmitForm_studies](./Models/CVSubmitForm_studies.md)
 - [CVSubmitForm_workExperiences](./Models/CVSubmitForm_workExperiences.md)
 - [CandidateRegistrationForm](./Models/CandidateRegistrationForm.md)
 - [CandidateSuspensionForm](./Models/CandidateSuspensionForm.md)
 - [DashboardDTO](./Models/DashboardDTO.md)
 - [EmployerRegistrationForm](./Models/EmployerRegistrationForm.md)
 - [EmployerStateChangeInformation](./Models/EmployerStateChangeInformation.md)
 - [MeetingAcceptanceForm](./Models/MeetingAcceptanceForm.md)
 - [MeetingCreationForm](./Models/MeetingCreationForm.md)
 - [MeetingCreationForm_location](./Models/MeetingCreationForm_location.md)
 - [OfferApplicationInformation](./Models/OfferApplicationInformation.md)
 - [OfferIdForm](./Models/OfferIdForm.md)
 - [OfferLikeInformation](./Models/OfferLikeInformation.md)
 - [OfferModel](./Models/OfferModel.md)
 - [OfferModel_Direction](./Models/OfferModel_Direction.md)
 - [OfferModel_applications](./Models/OfferModel_applications.md)
 - [OfferModel_reports](./Models/OfferModel_reports.md)
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

- **Type**: HTTP bearer authentication

