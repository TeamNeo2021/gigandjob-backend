# DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authLoginPost**](DefaultApi.md#authLoginPost) | **POST** /auth/login | Logs in a Candidate given an email and password
[**authLogoutPost**](DefaultApi.md#authLogoutPost) | **POST** /auth/logout | Logs out a Candidate given a JWT
[**cVPost**](DefaultApi.md#cVPost) | **POST** /CV | Registers a new CV of a candidate
[**candidateIdDelete**](DefaultApi.md#candidateIdDelete) | **DELETE** /Candidate/{id} | Deletes a candidate
[**candidateIdReactivatePost**](DefaultApi.md#candidateIdReactivatePost) | **POST** /Candidate/{id}/reactivate | Reactivates a candidate or deletes if treshold is surpased
[**candidateIdSuspendPost**](DefaultApi.md#candidateIdSuspendPost) | **POST** /Candidate/{id}/suspend | Suspends a candidate or deletes if treshold is surpased
[**candidatePost**](DefaultApi.md#candidatePost) | **POST** /Candidate | Registers a new candidate
[**candidateProfileGet**](DefaultApi.md#candidateProfileGet) | **GET** /Candidate/profile | Gets the data of the current logged in Candidate
[**dashboardGet**](DefaultApi.md#dashboardGet) | **GET** /dashboard | Read-Side for dashboard
[**employersIdDelete**](DefaultApi.md#employersIdDelete) | **DELETE** /employers/:id | Deletes an Employer
[**employersPost**](DefaultApi.md#employersPost) | **POST** /employers | Registers a new employer
[**employersReactivatedPut**](DefaultApi.md#employersReactivatedPut) | **PUT** /employers/Reactivated | Reactiva un Empleador
[**meetingAcceptPut**](DefaultApi.md#meetingAcceptPut) | **PUT** /meeting/accept | Accept a meeting
[**meetingIdGetallGet**](DefaultApi.md#meetingIdGetallGet) | **GET** /meeting/{id}/getall | Gets all meetings of a Candidate
[**meetingPost**](DefaultApi.md#meetingPost) | **POST** /meeting | Creates a meeting
[**meetingRejectPut**](DefaultApi.md#meetingRejectPut) | **PUT** /meeting/reject | Reject a meeting
[**offerApplyToOfferPut**](DefaultApi.md#offerApplyToOfferPut) | **PUT** /offer/applyToOffer | Applies to an offer
[**offerEliminitedPut**](DefaultApi.md#offerEliminitedPut) | **PUT** /offer/Eliminited | Eliminates an offer
[**offerGetallGet**](DefaultApi.md#offerGetallGet) | **GET** /offer/getall | Gets all registered offers
[**offerIdGetoneGet**](DefaultApi.md#offerIdGetoneGet) | **GET** /offer/{id}/getone | Gets a existing offer
[**offerIdReportPost**](DefaultApi.md#offerIdReportPost) | **POST** /offer/{id}/report | Reports an offer
[**offerLikeOfferPut**](DefaultApi.md#offerLikeOfferPut) | **PUT** /offer/likeOffer | Likes an offer
[**offerPost**](DefaultApi.md#offerPost) | **POST** /offer | Creates a new offer
[**offerReactivedPut**](DefaultApi.md#offerReactivedPut) | **PUT** /offer/Reactived | Reactivates an offer


<a name="authLoginPost"></a>
# **authLoginPost**
> inline_response_200 authLoginPost()

Logs in a Candidate given an email and password

    Logs in via HTTP Basic a given user using the email and password provided

### Parameters
This endpoint does not need any parameter.

### Return type

[**inline_response_200**](../Models/inline_response_200.md)

### Authorization

[BasicAuth](../README.md#BasicAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="authLogoutPost"></a>
# **authLogoutPost**
> String authLogoutPost()

Logs out a Candidate given a JWT

    Log out a Candidate given it&#39;s JWT

### Parameters
This endpoint does not need any parameter.

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="cVPost"></a>
# **cVPost**
> String cVPost(CVSubmitForm)

Registers a new CV of a candidate

    Creates a new cv that can be approved

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **CVSubmitForm** | [**CVSubmitForm**](../Models/CVSubmitForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="candidateIdDelete"></a>
# **candidateIdDelete**
> String candidateIdDelete(id)

Deletes a candidate

    Deletes a candidate and it&#39;s related records

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| The id of the candidate to delete | [default to null]

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="candidateIdReactivatePost"></a>
# **candidateIdReactivatePost**
> String candidateIdReactivatePost(id)

Reactivates a candidate or deletes if treshold is surpased

    Reactivates a candidate and the candidate is able to apply to a offer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| The id of the candidate to reactivate | [default to null]

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="candidateIdSuspendPost"></a>
# **candidateIdSuspendPost**
> String candidateIdSuspendPost(id, CandidateSuspensionForm)

Suspends a candidate or deletes if treshold is surpased

    Suspends a candidate and the candidate is no longer to apply to a offer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| The id of the candidate to suspend | [default to null]
 **CandidateSuspensionForm** | [**CandidateSuspensionForm**](../Models/CandidateSuspensionForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="candidatePost"></a>
# **candidatePost**
> String candidatePost(CandidateRegistrationForm)

Registers a new candidate

    Creates a new candidate that can apply to job offers

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **CandidateRegistrationForm** | [**CandidateRegistrationForm**](../Models/CandidateRegistrationForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="candidateProfileGet"></a>
# **candidateProfileGet**
> String candidateProfileGet(CandidateProfileInformation)

Gets the data of the current logged in Candidate

    Gets the data of the current logged in Candidate

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **CandidateProfileInformation** | [**CandidateProfileInformation**](../Models/CandidateProfileInformation.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="dashboardGet"></a>
# **dashboardGet**
> DashboardDTO dashboardGet()

Read-Side for dashboard

    Queries the info to build the web dashboard screen

### Parameters
This endpoint does not need any parameter.

### Return type

[**DashboardDTO**](../Models/DashboardDTO.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="employersIdDelete"></a>
# **employersIdDelete**
> String employersIdDelete(id, EmployerStateChangeInformation)

Deletes an Employer

    This action changes the state of the employer to deleted

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| The id of the employer to delete | [default to null]
 **EmployerStateChangeInformation** | [**EmployerStateChangeInformation**](../Models/EmployerStateChangeInformation.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="employersPost"></a>
# **employersPost**
> String employersPost(EmployerRegistrationForm)

Registers a new employer

    Creates a new employer that will hire candidates for a job.

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **EmployerRegistrationForm** | [**EmployerRegistrationForm**](../Models/EmployerRegistrationForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="employersReactivatedPut"></a>
# **employersReactivatedPut**
> String employersReactivatedPut(EmployerStateChangeInformation)

Reactiva un Empleador

    Esta accion cambio el estado de suspendido a reactivado/activo de un Empleador

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **EmployerStateChangeInformation** | [**EmployerStateChangeInformation**](../Models/EmployerStateChangeInformation.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="meetingAcceptPut"></a>
# **meetingAcceptPut**
> String meetingAcceptPut(MeetingAcceptanceForm)

Accept a meeting

    Candidate accepts going to a meeting with the employer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **MeetingAcceptanceForm** | [**MeetingAcceptanceForm**](../Models/MeetingAcceptanceForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="meetingIdGetallGet"></a>
# **meetingIdGetallGet**
> String meetingIdGetallGet(id, MeetingAcceptanceForm)

Gets all meetings of a Candidate

    Gets all meeting booked with a given Candidate

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **UUID**| The id of the candidate with which the meetings are booked | [default to null]
 **MeetingAcceptanceForm** | [**MeetingAcceptanceForm**](../Models/MeetingAcceptanceForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="meetingPost"></a>
# **meetingPost**
> String meetingPost(MeetingCreationForm)

Creates a meeting

    Creates a meeting with a given employer ID and candidate ID

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **MeetingCreationForm** | [**MeetingCreationForm**](../Models/MeetingCreationForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="meetingRejectPut"></a>
# **meetingRejectPut**
> String meetingRejectPut(MeetingAcceptanceForm)

Reject a meeting

    Candidate rejects going to a meeting with the employer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **MeetingAcceptanceForm** | [**MeetingAcceptanceForm**](../Models/MeetingAcceptanceForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerApplyToOfferPut"></a>
# **offerApplyToOfferPut**
> OfferReportInformation offerApplyToOfferPut(OfferApplicationInformation)

Applies to an offer

    Applies a candidate to an offer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **OfferApplicationInformation** | [**OfferApplicationInformation**](../Models/OfferApplicationInformation.md)|  |

### Return type

[**OfferReportInformation**](../Models/OfferReportInformation.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerEliminitedPut"></a>
# **offerEliminitedPut**
> String offerEliminitedPut(OfferIdForm)

Eliminates an offer

    Eliminates an offer and it&#39;s related entities

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **OfferIdForm** | [**OfferIdForm**](../Models/OfferIdForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerGetallGet"></a>
# **offerGetallGet**
> List offerGetallGet()

Gets all registered offers

    Returns all registered offers in the system

### Parameters
This endpoint does not need any parameter.

### Return type

[**List**](../Models/OfferModel.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="offerIdGetoneGet"></a>
# **offerIdGetoneGet**
> OfferModel offerIdGetoneGet(id)

Gets a existing offer

    Returns an offer given it&#39;s id

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id of the offer to be returned | [default to null]

### Return type

[**OfferModel**](../Models/OfferModel.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="offerIdReportPost"></a>
# **offerIdReportPost**
> OfferReportInformation offerIdReportPost(id, OfferReportInformation)

Reports an offer

    Reports an offer given it&#39;s id, a reporter Id and a reason

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id of the offer to be reported | [default to null]
 **OfferReportInformation** | [**OfferReportInformation**](../Models/OfferReportInformation.md)|  |

### Return type

[**OfferReportInformation**](../Models/OfferReportInformation.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerLikeOfferPut"></a>
# **offerLikeOfferPut**
> String offerLikeOfferPut(OfferLikeInformation)

Likes an offer

    Candidate gives like to an offer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **OfferLikeInformation** | [**OfferLikeInformation**](../Models/OfferLikeInformation.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerPost"></a>
# **offerPost**
> String offerPost(OfferRegistrationForm)

Creates a new offer

    Creates a new offer with the fields of direction, sector, budget and description

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **OfferRegistrationForm** | [**OfferRegistrationForm**](../Models/OfferRegistrationForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerReactivedPut"></a>
# **offerReactivedPut**
> String offerReactivedPut(OfferIdForm)

Reactivates an offer

    Reactivates a previously suspended offer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **OfferIdForm** | [**OfferIdForm**](../Models/OfferIdForm.md)|  |

### Return type

**String**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

