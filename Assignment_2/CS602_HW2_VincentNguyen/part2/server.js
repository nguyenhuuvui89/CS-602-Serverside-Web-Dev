/* eslint-disable no-underscore-dangle */
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Can use direct as express 4.16 have default body-parser
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(`${__dirname}/public`));

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage

app.get('/', (req, res) => {
  res.render('homeView');
});
// GET request when id parameter is present (lookupByZipView) and not present (lookupByZipForm)
app.get('/zip', (req, res) => {
  const { id } = req.query;
  if (id) {
    const result = cities.lookupByZipCode(id);
    const message = `City: ${result.city}, State: ${result.state}, Population: ${result.pop}`;
    res.render('lookupByZipView', { zipCode: id, data: message, city1: result.city, state1: result.state });
  } else {
    res.render('lookupByZipForm');
  }
});
// POST request for the request body id parameter (lookupByZipView)
app.post('/zip', (req, res) => {
  const { id } = req.body;
  const result = cities.lookupByZipCode(id);
  const message = `City: ${result.city}, State: ${result.state}, Population: ${result.pop}`;
  res.render('lookupByZipView', { zipCode: id, data: message, city1: result.city, state1: result.state });
});

// GET request use the named routing id parameters
app.get('/zip/:id', (req, res) => {
  const { id } = req.params;
  const result = cities.lookupByZipCode(id);
  // Implement the JSON, XML, & HTML formats
  res.format({
    'application/json': () => {
      res.json(result);
    },
    'application/xml': () => {
      const resultXml = 
        `<?xml version="1.0"?>
  <zipCode id=${result._id}>
    <city>${result.city}</city>
    <state>${result.state}</state>
    <pop>${result.pop}</pop>
  </zipCode>`;
      res.type('application/xml');
      res.send(resultXml);
    },
    'text/html': () => {
      const message = `City: ${result.city}, State: ${result.state}, Population: ${result.pop}`;
      res.render('lookupByZipView', { zipCode: id, data: message, city1: result.city, state1: result.state });
    },
    default: () => {
      res.status(404);
      res.send('<b>404 - Not Found</b>');
    },
  });
});

// GET request query city and state parameters present(lookupByCityStateView)
// and not (lookupByCityStateForm)
app.get('/city', (req, res) => {
  const { city } = req.query;
  const { state } = req.query;
  if (city && state) {
    const result = cities.lookupByCityState(city, state);
    res.render(
      'lookupByCityStateView',
      { cityD: city, stateD: state, data1: result.data },
    );
  } else {
    res.render('lookupByCityStateForm');
  }
});
// POST request for the request body state  and city parameters
app.post('/city', (req, res) => {
  const { city } = req.body;
  const { state } = req.body;
  const result = cities.lookupByCityState(city, state);
  res.render(
    'lookupByCityStateView',
    { cityD: city, stateD: state, data1: result.data },
  );
});

// GET request use the name routing city and state parameters
app.get('/city/:city/state/:state', (req, res) => {
  const { city } = req.params;
  const { state } = req.params;
  const result = cities.lookupByCityState(city, state);
  // Implement the JSON, XML, & HTML formats
  res.format({
    'application/json': () => {
      res.json(result);
    },
    'application/xml': () => {
      const resultXml = 
      `<?xml version="1.0"?>
<city-state city=${result.city} state=${result.state}>
  ${result.data.map((e) => (`<entry zip="${e.zip}" pop="${e.pop}" />`)).join('\n  ')}
</city-state>`;
      res.type('application/xml');
      res.send(resultXml);
    },
    'text/html': () => {
      res.render(
        'lookupByCityStateView',
        { cityD: city, stateD: state, data1: result.data },
      );
    },
    default: () => {
      res.status(404);
      res.send('<b>404 - Not Found</b>');
    },
  });
});
// GET request query state parameter is present (populationView), if not (populationForm)
app.get('/pop', (req, res) => {
  const { state } = req.query;
  if (state) {
    const result = cities.getPopulationByState(state);
    res.render('populationView', { state: result.state, pop: result.pop });
  } else {
    res.render('populationForm');
  }
});

// requests Use the named routing state parameter
app.get('/pop/:state', (req, res) => {
  const { state } = req.params;
  const result = cities.getPopulationByState(state);
  // Implement the JSON, XML, & HTML formats
  res.format({
    'application/json': () => {
      res.json(result);
    },
    'application/xml': () => {
      const resultXml = 
      `<?xml version="1.0"?>
<state-pop state=${result.state}>
    <pop>${result.pop}</pop>
</state-pop>`;
      res.type('application/xml');
      res.send(resultXml);
    },
    'text/html': () => {
      res.render('populationView', { state: result.state, pop: result.pop });
    },
    default: () => {
      res.status(404);
      res.send('<b>404 - Not Found</b>');
    },
  });
});

app.use((req, res) => {
  res.status(404);
  res.render('404');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
