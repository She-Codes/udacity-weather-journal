# Weather-Journal App Project

## Overview

This project creates an asynchronous web app that uses the OpenWeather API and user data to dynamically update the UI.

## Instructions

If [nodemon](https://nodemon.io/) is installed, you can run `yarn start` or `npm run start` to start the app. Otherwise run `node server.js` from your console.

## Details

Enter a zipcode and your current feelings in the form. There is some client-side validation in place so these values must be entered in order for the app to function.

The zipcode is used to fetch data from the OpenWeather API, the data returned from the API is then in turn submitted to the server along with the user entered data. The saved data is returned from the server and rendered to the UI.
