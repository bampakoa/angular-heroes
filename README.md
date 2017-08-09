# Angular Heroes

This is an Angular application that interacts with the [Marvel Comics API](http://developer.marvel.com/) and provides a basic search engine over the characters and comics database.
It allows to find a character and view information such as basic details as well as digital editions of comics that participates. It also
features a [questionnaire](https://angular2-marvel.herokuapp.com/quiz) that the user can complete in order to find the hero that fits to his character.

## Demo
You can test a fully functional working live demo at [http://angular2-marvel.herokuapp.com](http://angular2-marvel.herokuapp.com)

## Setup

Install the Angular CLI by following the instructions [here](https://github.com/angular/angular-cli#installation). 

Clone this repo to your desktop and run `npm install` to install all the dependencies.

## Usage

Before you start, you must acquire a developer key from [Marvel Developer Portal](http://developer.marvel.com/). After you get one, 
replace `apiKey` variable in `src/environments` files with the newly acquired **public** key.

```
export const environment = {
  ...
  apiEndpoint: '//gateway.marvel.com/v1/public/',
  apiKey: '<Your public key here>'
};
```

Run `ng serve` to start the application. You will then be able to access it at http://localhost:4200

## Thanks
[@FUSIONHACK](https://twitter.com/FUSIONHACK) for the nice background image and the search box!
