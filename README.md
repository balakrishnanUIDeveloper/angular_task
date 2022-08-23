# Angular Customer Statement Processor #

### Assignment ###

* Task summary

  Application receives monthly deliveries of customer statement records. This information is delivered in two formats, CSV and XML. These records need to be validated. based on below conditions
  
     * all transaction references should be unique
     * end balance needs to be validated 
     * Return both the transaction reference and description of each of the failed records

## Implementation

* Responsive Design - used Bootstrap 4.2
* upload .csv or .xml file to the input.
* transactions are shown in two tabs, Success and Failure.
* Failure transactions include records with duplicate reference and invalid endbalance.
* Duplicate transaction reference ID's are shown in red colour.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## run production code 

Run `npm run prod` to run the production ready code. please run it only after running `ng build` or `npm run build`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Creator

Balakrishnan 

## Scope for betterment

* JenkinsFile for CI/ CD pipeline.
* SonarQube setup
