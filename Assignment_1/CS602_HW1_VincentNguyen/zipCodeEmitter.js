/* eslint-disable no-underscore-dangle */
const EventEmitter = require('events').EventEmitter;
const data = require('./zips.json');

// Custom class
class ZipCodeEmitter extends EventEmitter {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }
  // member functions

  // method lookup by zip code, emit the event when is called.
  lookupByZipCode(zip) {
    const result = data.find((obj) => obj._id === zip);
    this.emit('lookupByZipCode', result);
  }
  // method lookup by city, emit the event when is called.

  lookupByCityState(city, state) {
    const result = {};
    result.city = city;
    result.state = state;
    const filterData = data.filter((element) => element.city === city && element.state === state)
      .map((element) => {
        const container = {};
        container.zip = element._id;
        container.pop = element.pop;
        return container;
      });
    result.data = filterData;
    this.emit('lookupByCityState', result);
  }
  // method get population by State, emit the event when is called.

  getPopulationByState(state) {
    const result = {};
    result.state = state;
    const totalPopulation = data.reduce((accumulator, currentValue) => {
      if (currentValue.state === state) {
      // eslint-disable-next-line no-param-reassign
        accumulator += currentValue.pop;
      }
      return accumulator;
    }, 0);
    result.pop = totalPopulation;
    this.emit('getPopulationByState', result);
  }
}

module.exports.ZipCodeEmitter = ZipCodeEmitter;
