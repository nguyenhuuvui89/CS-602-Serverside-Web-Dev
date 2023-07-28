/* eslint-disable no-underscore-dangle */
const data = require('./zips.json');

// function lookup by zip code
module.exports.lookupByZipCode = (zip) => {
  const result = data.find((obj) => obj._id === zip);
  return result;
};

// function lookup by city, state
module.exports.lookupByCityState = (city, state) => {
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
  return result;
};

// function get population by state
module.exports.getPopulationByState = (state) => {
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
  return result;
};
