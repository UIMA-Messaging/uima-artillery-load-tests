# UIMA Load Tests

The UIMA load tests aims to assess wether different scenarios can perform under load. These tests are performed with a CLI tool called Artillery.

> Information regarding how to install is can be found [here](https://www.artillery.io/docs/get-started/get-artillery).

For the sake of simplicity, a node project was created, allowing more granular control over certain aspects of the load testing.

## Scenarios

The scenarios are made in such a way as as to more or less mirror the UIMA regress test features [here](https://github.com/UIMA-Messaging/uima-test-suite/tree/master/src/test/resources/features). Each load testing scenarios can be tweaked to meet certain criteria [here](https://github.com/UIMA-Messaging/uima-load-tests/tree/master/src/tests)

> More information regarding UIMA regression tests can be found [here](https://github.com/UIMA-Messaging/uima-test-suite)

### User searching scenario

This scenario aims to test wether a publicly available endpoint is available

For this scenario, an endpoint for retrieving paginated search results of users was created: 

`GET /api/identity/users/search/<username>`

The endpoint makes a request to a database that performs fuzzy searching depending on the <username> path variable provided in the URL. 
The test was comprised of 3 phases: a ramp up phase where the number of user increases from 0 to 100 concurrent user for 30 seconds, a steady phase where 100 concurrent users remains constant for 60 seconds, and a ramp down phase where the number of users ramp down from 100 to 0 for 30 seconds. 

> Latest test results for this scenario can be found [here](https://github.com/UIMA-Messaging/uima-load-tests/blob/master/src/reports/user-searching.html)

### User registration and deregistration scenario 

This test aims to measure wether the most complex part of the backend can sustain load without issue. 
  
The endpoint tested are that for registering user and deregistering them: 
  
`POST /protected/api/registrations/users/register` where body contains json of basic user data 
  
Upon registering through the above POST request, a new user is inserted to a Postgres database and a message is sent to an event bus notifying of a newly created user. Two consumers of this message in turn modify data other Postgres database. 

`DELETE /protected/api/registrations/users/unregister/<user id>`

Upon deregistering though the above DELETE request, the user is remove from a Postgres database and a message is send to an event bus notifying of the recently removed user. Like before, two consumers of this message in turn modify data other Postgres database. 
Additionally, in order for user to register, they must first authenticate via an additional authentication endpoint that gives them access for registration: 

`POST /api/auth/tokens/create`

In the backend, requests are authenticated via the same authentication service. 

In essence, the following process is as follow: 
  
![MITM](https://github.com/UIMA-Messaging/uima-load-tests/assets/56337726/4b2ac494-2e22-4e90-bb99-15980c4fd377)
  
> Latest test results for this scenario can be found [here](https://github.com/UIMA-Messaging/uima-load-tests/blob/master/src/reports/user-registration-2.html)

Much like the previous scenario, the test was comprised of 3 phases: a ramp up phase where the number of user increases from 0 to 50 concurrent user for 15 seconds, a steady phase where 50 concurrent users remains constant for 60 seconds, and a ramp down phase where the number of users ramp down from 50 to 0 for 15 seconds. 
