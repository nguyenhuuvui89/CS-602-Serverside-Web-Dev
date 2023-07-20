/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const colors = require('colors');

const ZipCodeEmitter = require('./zipCodeEmitter').ZipCodeEmitter;

const cities = new ZipCodeEmitter();
// subscribe the lookupByZipCode event
cities.on('lookupByZipCode', (result) => {
  console.log();
  console.log(colors.red(`Lookup by zip code(${result._id}) \n`));
  console.log(colors.magenta('Event lookupByZipCode raised!'));
  console.log(colors.magenta(result));
});
// subscribe the lookupByCityState event
// Handlers 1 for lookupByCityState event
cities.on('lookupByCityState', (result) => {
  console.log();
  console.log(colors.red(`Lookup by city (${result.city}, ${result.state}) \n`));
  console.log(colors.magenta('Event lookupByCityState raised! (Handler1)'));
  console.log(result);
});
// Handlers 2 for lookupByCityState event

cities.on('lookupByCityState', (result) => {
  console.log();
  console.log(colors.magenta('Event lookupByCityState raised! (Handler2)'));
  console.log(colors.magenta(` City: ${result.city}, State: ${result.state}`));
  const arrayData = result.data;
  arrayData.forEach((element) => {
    console.log(colors.magenta(`  ${element.zip} has population of ${element.pop}`));
  });
});
// subscribe the getPopulationByState event

cities.on('getPopulationByState', (result) => {
  console.log();
  console.log(colors.red(`Get Population by State(${result.state})`));
  console.log(colors.magenta('Event getPopulationByState raised!'));
  console.log(colors.magenta(' ', result));
});
// Call the methods from my custom class (ZipCodeEmitter) that raise the event.
cities.lookupByZipCode('02215');
cities.lookupByCityState('BOSTON', 'MA');
cities.getPopulationByState('MA');
