/* eslint-disable no-plusplus */
/* eslint-disable no-console */
const data = require('./zips.json');

const dataLength = data.length;
// eslint-disable-next-line consistent-return
// function lookup by zip code
module.exports.lookupByZipCode = (zip) => {
  for (let i = 0; i < dataLength; i++) {
    // eslint-disable-next-line no-restricted-syntax, no-underscore-dangle
    if (data[i]._id === zip) {
      return data[i];
    }
  }
  return undefined;
};

// function lookup by city, state
module.exports.lookupByCityState = (city, state) => {
  const result = {};
  result.city = city;
  result.state = state;
  const data1 = [];
  for (let i = 0; i < dataLength; i++) {
    const information = {};
    if (data[i].city === city && data[i].state === state) {
      // eslint-disable-next-line no-underscore-dangle
      information.zip = data[i]._id;
      information.pop = data[i].pop;
      data1.push(information);
    }
    result.data = data1;
  }
  return result;
};

// function get population by state
module.exports.getPopulationByState = (state) => {
  const result = {};
  result.state = state;
  let population = 0;
  for (let i = 0; i < dataLength; i++) {
    if (data[i].state === state) {
      population += data[i].pop;
    }
  }
  result.pop = population;
  return result;
};
