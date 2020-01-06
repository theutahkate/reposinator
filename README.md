# The Reposinator

## Features
The Reposinator does the following:
• Calls [GitHub's API](https://developer.github.com/v3/) get repository and commits data
• Displays cards for the 100 most-starred repositories on GitHub
• On click of "Recent Commits" button, displays data for all commits made in the last 24 hours
• Displays error message if the GitHub call returns an error
• The Reposinator is tested using Jasmine and Karma

## Considerations/Musings/Next Steps
I mentioned in my conversation with Derek that I haven't had the opportunity to work with frameworks as much as I'd like, and this is my first full Angular application. As such, much of my time was spent on Angular learning curves, and there are some places I would normally have dedicated more time to.
• The initial call to get repository information is slow. There are a few things I would do here. First, before building out a feature like this, I would gently push back against a design requiring 100 cards to be displayed, for performance and UX reasons, and would advocate for something more like displaying 10 cards with more displayed by user action. To improve the user experience for The Reposinator as is, I would want to implement browser caching and would consider adding a loader.
• While there are some specs for error handling, there are not yet tests directly on the http interceptor (`src/app/http-error.interceptor.ts`), and I would normally write tests for that as well.

## Setup
You'll need to have the following installed in order to run The Reposinator locally (follow links for installation instructions, if needed):
• [Node.js](https://nodejs.org/en/download/)
• [npm](https://www.npmjs.com/get-npm)
• [Angular CLI](https://www.npmjs.com/package/@angular/cli)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## PS
Thanks! This was fun!