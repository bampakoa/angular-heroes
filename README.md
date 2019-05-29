# Angular Heroes

This is an Angular application that interacts with the [Marvel Comics API](http://developer.marvel.com/) and provides a basic search engine over the characters and comics database.
It allows to find a character and view information such as basic details and digital editions of comics that participates. It also
features a questionnaire that the user can complete in order to find the hero that fits to his character.

## Setup

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
[@BarryQuinn](https://twitter.com/Legion945) for the nice images on the background and the search box!
