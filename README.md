# Angular Heroes

An Angular application that uses Angular Material and interacts with the [Marvel Comics API](https://developer.marvel.com/documentation/getting_started). The purpose of the application is to demonstrate how to apply common Angular techniques and use some of the Angular Material components.

It provides a basic search engine over the characters and comics Marvel database. It allows to find a hero character and view information such as basic details and comics.

<img src="https://github.com/bampakoa/angular-heroes/blob/master/preview.png?raw=true" alt="Preview">

## Setup

Clone this repo to your desktop and run `npm install` to install all the dependencies.

## Usage

Before you start, you must acquire a developer key from [Marvel Developer Portal](https://developer.marvel.com/). After you get one, 
replace `apiKey` variable in `src\app\auth-interceptor.ts` file with the newly acquired **public** key.

```
const apiKey = '<Your public key here>';
```

Run `ng serve` to start the application. You will then be able to access it at http://localhost:4200
