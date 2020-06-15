# Goals & Motivation

I started working on this app while doing the ["Angular - The Complete Guide (2020 Edition)"](https://www.udemy.com/course/the-complete-guide-to-angular-2/) course. This is the greatest and most comprehensive Angular course you can find at the moment. It covers all aspects of modern development using Angular 9 and nearby technologies.

<p>The main goal was to gain hands-on skills, best practices and methodologies related to Angular development and try them out in practice. I tried to cover as many topics as possible and put into practice everything that I've learned in this app.</p>

## About this app

**Demo:** [https://dkorolev1.github.io/dkorolev-ng-training-app/](https://dkorolev1.github.io/dkorolev-ng-training-app/)

The core idea behind the app is pretty simple. It consists from Auth page and 2 feature pages - Recipes and Shopping List.

##### Auth:
On the Auth page you can login or sign up. All formal identity checks and email confirmations were omitted for simplicity. The goal was to understand how the authentication strategy works as a whole, and not go into such details. So, just provide any well-formatted email address and password. And that's it, now you can test it.

##### Recipes:
On the Recipes page you can find information about all available recipes. This data is accessible to everyone and therefore can be changed by any authenticated user. Feel free to add your favorite dish's recipe or edit/delete an existing one. :wink:

##### Shopping List:
On the Shopping List page you can find information about ingredients in your shopping list. Each user has their own Shopping List. 

There are several ways to add ingredients to your shopping list. You can either add them one by one, using the form on the Shopping List page, or open the recipe you like and click Manage -> To Shopping List. In this case, all the ingredients that belong to this recipe will be automatically added to your shopping list. After that you could save this list as PDF (Save as PDF button) and go shopping :smirk:


## Remarks

- I used [FireBase](https://firebase.google.com/) as a backend for this app.
- [NgRx](https://ngrx.io/) was used for state management.
- Appearance was not a priority, so I did not pay much attention to it and didn't use any component libs. All I used is just "pure" [Bootstrap (v3.3.7)](https://getbootstrap.com/) so that it doesn't look completely ugly :)

## Highlights

[Angular CLI](https://cli.angular.io/) ---- Components & Databinding --- Directives --- [NgRx](https://ngrx.io/) --- [Router-Store](https://ngrx.io/guide/router-store) --- [RxJS](https://rxjs-dev.firebaseapp.com/) --- Observables --- Services --- Dependency Injection --- [Routing](https://angular.io/guide/router) --- [Forms (Template Driven and Reactive approaches)](https://angular.io/guide/forms-overview) --- [Pipes](https://angular.io/guide/pipes) --- [HttpClient](https://angular.io/tutorial/toh-pt6) --- Authentication --- [Guards](https://angular.io/api/router/CanActivate) --- [Interceptors](https://angular.io/api/common/http/HttpInterceptor) --- Modules --- Lazy loading --- Modules Preloading --- Dynamic Components --- [Angular Animations](https://angular.io/api/animations) --- [Offline Capabilities with Service Workers](https://angular.io/guide/service-worker-intro) --- [Angular Universal (SSR)](https://angular.io/guide/universal) --- [Unit Testing](https://angular.io/guide/testing) --- [Jasmine](https://jasmine.github.io/) --- [Jasmine marbles](https://www.npmjs.com/package/jasmine-marbles) --- [Karma](https://karma-runner.github.io/latest/index.html)

## ToDo List

1. At the moment, only the Auth module and interceptors are covered by tests. Both Recipes & Shopping List modules should be covered as well.
2. Add error handling to Recipes and Shopping List modules. At the moment, it's implemented only in the Auth module. Consider centralized errors processing.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server (Node.js)

Run `npm run build:ssr` and `npm run serve:ssr` to serve the app using Node.js server and get all the benefits, including **Server Side Rendering** and **Offline Capabilities**, including Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

Run `ng deploy --base-href https://dkorolev1.github.io/dkorolev-ng-training-app/` to deploy the app to GitHub Pages.

## Testing

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Browser Support

Chrome, Firefox
