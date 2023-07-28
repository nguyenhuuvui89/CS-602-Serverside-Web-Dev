const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;

const getConnection = async () => {
  // eslint-disable-next-line max-len
  if (client == null) client = await MongoClient.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  return client;
};

module.exports.lookupByZipCode = async (zip) => {
  let client = await getConnection();
  let collection = client.db(credentials.database).collection('zipcodes');
  let result = await collection.find({ _id: zip }).toArray();
  if (result.length > 0)
    return result[0];
  else
    return undefined;
};

// Complete the code for the following

module.exports.lookupByCityState = async (city, state) => {
  let client = await getConnection();
  let collection = client.db(credentials.database).collection('zipcodes');
  // Get data from database
  const data = await collection.find({ city: city, state: state }).toArray();
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

module.exports.getPopulationByState = async (state) => {
  let client = await getConnection();
  let collection = client.db(credentials.database).collection('zipcodes');
  // Get data from database, find by state
  const data = await collection.find({ state: state }).toArray();
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
