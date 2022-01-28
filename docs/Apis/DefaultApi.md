# DefaultApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**employersPost**](DefaultApi.md#employersPost) | **POST** /employers | Registers a new employer
[**meetingAcceptPut**](DefaultApi.md#meetingAcceptPut) | **PUT** /meeting/accept | Accept a meeting
[**offerEliminitedPut**](DefaultApi.md#offerEliminitedPut) | **PUT** /offer/Eliminited | Eliminates an offer
[**offerIdReportPost**](DefaultApi.md#offerIdReportPost) | **POST** /offer/{id}/report | Reports an offer
[**offerPost**](DefaultApi.md#offerPost) | **POST** /offer | Creates a new offer
[**offerReactivedPut**](DefaultApi.md#offerReactivedPut) | **PUT** /offer/Reactived | Reactivates an offer
[**registerCandidatePost**](DefaultApi.md#registerCandidatePost) | **POST** /registerCandidate | Registers a new candidate


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

No authorization required

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

No authorization required

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

No authorization required

### HTTP request headers

- **Content-Type**: application/json
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

No authorization required

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

No authorization required

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

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="registerCandidatePost"></a>
# **registerCandidatePost**
> String registerCandidatePost(CandidateRegistrationForm)

Registers a new candidate

    Creates a new candidate that can apply to job offers

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **CandidateRegistrationForm** | [**CandidateRegistrationForm**](../Models/CandidateRegistrationForm.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

