# Welcome to the React Front-End for Bacon Listings

The front-end server is hosted on firebase.

User authentication is from firebase's google auth api.

google-map-react is providing the google map feature.

## Getting Started

https://react-for-bacon.firebaseapp.com/

or

clone the repository

npm install

npm start

## Users you may use for testing

Google Test Account: bacontester1@gmail.com

password: bacontest

Google Test Account: bacontester2@gmail.com

password: bacontest

The rails api is seeded so that bacontester1 created all the seed jobs.

Log in as bacontester2 to view application functionality

There are more auth methods. I chose only google auth because google does not require keys, but facebook and github requires api keys.

Checkout the docs, its really cool.

https://firebase.google.com/docs/auth/

## User Story

If User is not logged in, user may view job listings, but can not apply

When User logs in with google, user may apply to jobs, user may create job.

User who creates job may not apply.

Once User has applied, the user can no longer apply.

There is a search feature that will filter jobs.

Click clear search to re-render the original index list after searching.
