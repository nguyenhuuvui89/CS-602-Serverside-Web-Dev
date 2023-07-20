/* eslint-disable no-console */
const colors = require('colors');
const cities = require('./zipCodeModule_v1');

// Method 1: Using function and call later.

// function to print out lookup by zip code
function lookupByZip(zip) {
  console.log();
  console.log(colors.red(`Lookup by zip code(${zip})`));
  console.log(cities.lookupByZipCode(zip));
}

// call function for given zip codes
lookupByZip('02215');
lookupByZip('99999');

// function to print out lookup by city and state
function lookupByCity(city, state) {
  console.log();
  console.log(colors.red(`Lookup by city (${city}, ${state})`));
  console.log(cities.lookupByCityState(city, state));
}

// call function for given city and state names
lookupByCity('BOSTON', 'MA');
lookupByCity('BOSTON', 'TX');
lookupByCity('BOSTON', 'AK');

// function to print out population by state
function population(state) {
  console.log();
  console.log(colors.red(`Get Population by State (${state})`));
  console.log(cities.getPopulationByState(state));
}

// call function for given state names
population('MA');
population('TX');
population('AA');

// Method 2 using console.log only

// const zipCode = '02215';
// const result = cities.lookupByZipCode(zipCode);
// console.log(`colors.red(Lookup by zip code(${zipCode}))`;
// console.log(result);
