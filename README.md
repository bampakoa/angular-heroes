# Angular Heroes

This is an Angular web application that interacts with the Marvel Comics API and provides a basic search engine over the Marvel characters database.
It allows to search for a given character and view information such as basic details as well as digital editions of comics that participates.

## Demo
You can test a fully functional working live demo at [http://angular2-marvel.herokuapp.com](http://angular2-marvel.herokuapp.com)

## Setup

Install the Angular CLI by following the instructions [here](https://github.com/angular/angular-cli#installation). 

Clone this repo to your desktop and run `npm install` to install all the dependencies.

## Usage

Before you can start, you must acquire a developer key from [Marvel Developer Portal](http://developer.marvel.com/). After you get one, 
replace `apiKey` variable in `app.config.ts` with the newly acquired **public** key.

```
export const appConfig: AppConfig = {
  apiEndpoint: '//gateway.marvel.com/v1/public/',
  apiKey: '<Your public key here>'
};
```

Run `ng serve` to start the application. You will then be able to access it at http://localhost:4200

## Thanks
[@FUSIONHACK](https://twitter.com/FUSIONHACK) for the nice background image and the search box!
