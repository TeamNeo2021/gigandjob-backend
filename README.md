<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## :mag_right: Description

DDD oriented Nestjs backend with a Hexagonal Architecture for the Gig&Job System.

This is the 2022 1st semester project for the Software Development subject from the Informatics Engineering Career at Universidad Católica Andrés Bello.

This application handles the backend of a search and application system of jobs or gits.

## :spiral_notepad: Built with

- [Node.js](https://nodejs.org/es/) - JavaScript execution environment
- [Typescript](https://www.typescriptlang.org/) - Programming language with which the project was built
- [Git](https://git-scm.com/) - Version manager
- [Jest](https://jestjs.io/) - Test Framework


## :wrench: Installation

First you need to set up a Firebase Project and create a FireStore DataBase
1. [Set up a new Firebase Project with the console](https://firebase.google.com/products/firestore)
2. Create a Firestore Database 
3. [Generate private keys from Firebase console ](https://firebase.google.com/docs/admin/setup#initialize-sdk)
4. Install all the dependencies

```bash
$ npm install
```

## :rocket: Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## :test_tube: Test

```bash
##Unit testing

# unit tests
$ npm run test
#or you can just use
$ jest
```
<!-- # e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov -->


## :green_book: Nestjs Documentation


- Website - [https://nestjs.com](https://nestjs.com/)

## :blue_book: Architecture

### HEXAGONAL ARCHITECTURE DIAGRAM

![alt text](./assets/hexagonal-diagram.png?raw=true "Hexagonal Diagram")

### UML CLASSES DIAGRAM

![alt text](./assets/uml-diagram.png?raw=true "UML diagram") 


## :orange_book: Code References

- [Use Firestore with NestJS](https://ricardoromanj.com/posts/firestore-with-nestjs)
- [Hands On Domain Driven Design, Alexey Zimarev](https://www.amazon.com/-/es/Alexey-Zimarev-ebook/dp/B07C5WSR9B)
- [Clean Architecture Robert C Martin](https://www.amazon.com/-/es/Robert-Martin-Arquitectura-limpia-estructura/dp/0134494164)

## :computer: Contributors

- [Carlos Alonso - Product Owner - Teacher](https://github.com/cealonzo) 
- [Jose Luis Moncada - Team Leader - Scrum Master](https://github.com/joselmoncada)
- [Jorge Croquer - Team Leader](https://github.com/YorchUCAB)
- [Jose Leonardo Contreras - Team Leader](https://github.com/LeoProgrammerUCAB)
- [Carlos Valero](https://github.com/cdevalero)
- [Michael Nello](https://github.com/UCAB-MichaelNelo)
- [Luis Pinto](https://github.com/LuisPinto17)
- [Cristian Gonzales](https://github.com/cristianGonz)
- [Rabindra Harinchard](https://github.com/RabindraHarichand)
- [Francisco Luna](https://github.com/fjluna13)
- [Antonio Nohra](https://github.com/anohra15)

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost:3000*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DefaultApi* | [**candidatesIdReactivatePost**](docs/Apis/DefaultApi.md#candidatesidreactivatepost) | **POST** /candidates/{id}/reactivate | Reactivates a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatesIdSuspendPost**](docs/Apis/DefaultApi.md#candidatesidsuspendpost) | **POST** /candidates/{id}/suspend | Suspends a candidate or deletes if treshold is surpased
*DefaultApi* | [**candidatesPost**](docs/Apis/DefaultApi.md#candidatespost) | **POST** /candidates | Registers a new candidate
*DefaultApi* | [**employersPost**](docs/Apis/DefaultApi.md#employerspost) | **POST** /employers | Registers a new employer
*DefaultApi* | [**meetingAcceptPut**](docs/Apis/DefaultApi.md#meetingacceptput) | **PUT** /meeting/accept | Accept a meeting
*DefaultApi* | [**offerEliminitedPut**](docs/Apis/DefaultApi.md#offereliminitedput) | **PUT** /offer/Eliminited | Eliminates an offer
*DefaultApi* | [**offerIdReportPost**](docs/Apis/DefaultApi.md#offeridreportpost) | **POST** /offer/{id}/report | Reports an offer
*DefaultApi* | [**offerPost**](docs/Apis/DefaultApi.md#offerpost) | **POST** /offer | Creates a new offer
*DefaultApi* | [**offerReactivedPut**](docs/Apis/DefaultApi.md#offerreactivedput) | **PUT** /offer/Reactived | Reactivates an offer


<a name="documentation-for-models"></a>
## Documentation for Models

 - [CandidateRegistrationForm](docs/Models/CandidateRegistrationForm.md)
 - [CandidateSuspensionForm](docs/Models/CandidateSuspensionForm.md)
 - [EmployerRegistrationForm](docs/Models/EmployerRegistrationForm.md)
 - [MeetingAcceptanceForm](docs/Models/MeetingAcceptanceForm.md)
 - [OfferIdForm](docs/Models/OfferIdForm.md)
 - [OfferRegistrationForm](docs/Models/OfferRegistrationForm.md)
 - [OfferReportInformation](docs/Models/OfferReportInformation.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

All endpoints do not require authorization.


## License

Nest is [MIT licensed](LICENSE).
