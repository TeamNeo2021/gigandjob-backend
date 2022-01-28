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
> String employersPost(inline\_object\_1)

Registers a new employer

    Creates a new employer that will hire candidates for a job.

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inline\_object\_1** | [**inline_object_1**](../Models/inline_object_1.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="meetingAcceptPut"></a>
# **meetingAcceptPut**
> String meetingAcceptPut(inline\_object\_2)

Accept a meeting

    Candidate accepts going to a meeting with the employer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inline\_object\_2** | [**inline_object_2**](../Models/inline_object_2.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerEliminitedPut"></a>
# **offerEliminitedPut**
> String offerEliminitedPut()

Eliminates an offer

    Eliminates an offer and it&#39;s related entities

### Parameters
This endpoint does not need any parameter.

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="offerIdReportPost"></a>
# **offerIdReportPost**
> String offerIdReportPost(id, inline\_object\_5)

Reports an offer

    Reports an offer given it&#39;s id, a reporter Id and a reason

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| The id of the offer to be reported | [default to null]
 **inline\_object\_5** | [**inline_object_5**](../Models/inline_object_5.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerPost"></a>
# **offerPost**
> String offerPost(inline\_object\_3)

Creates a new offer

    Creates a new offer with the fields of direction, sector, budget and description

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inline\_object\_3** | [**inline_object_3**](../Models/inline_object_3.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="offerReactivedPut"></a>
# **offerReactivedPut**
> String offerReactivedPut(inline\_object\_4)

Reactivates an offer

    Reactivates a previously suspended offer

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inline\_object\_4** | [**inline_object_4**](../Models/inline_object_4.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="registerCandidatePost"></a>
# **registerCandidatePost**
> String registerCandidatePost(inline\_object)

Registers a new candidate

    Creates a new candidate that can apply to job offers

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inline\_object** | [**inline_object**](../Models/inline_object.md)|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

