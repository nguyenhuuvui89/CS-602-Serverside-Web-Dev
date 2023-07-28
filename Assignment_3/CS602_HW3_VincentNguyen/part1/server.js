const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', 
	handlebars({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the employee module
const cities = require('./mongo_zipCodeModule_v2');

// GET request to the homepage

app.get('/', (req, res) => {
  res.render('homeView');
});

// GET request when id parameter is present (lookupByZipView) and not present (lookupByZipForm)
app.get('/zip', async (req, res) => {
  const { id } = req.query;
  if (id) {
    const result = await cities.lookupByZipCode(id);
    const message = `City: ${result.city}, State: ${result.state}, Population: ${result.pop}`;
    res.render('lookupByZipView', { zipCode: id, data: message, city1: result.city, state1: result.state });
  } else {
    res.render('lookupByZipForm');
  }
});
// POST request for the request body id parameter (lookupByZipView)
app.post('/zip', async (req, res) => {
  const { id } = req.body;
  const result = await cities.lookupByZipCode(id);
  const message = `City: ${result.city}, State: ${result.state}, Population: ${result.pop}`;
  res.render('lookupByZipView', { zipCode: id, data: message, city1: result.city, state1: result.state });
});

// GET request use the named routing id parameters
app.get('/zip/:id', async (req, res) => {
  const { id } = req.params;
  const result = await cities.lookupByZipCode(id);
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

// Complete the code for the following
// GET request query city and state parameters present(lookupByCityStateView)
// and not (lookupByCityStateForm)
app.get('/city', async (req, res) => {
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
app.post('/city', async (req, res) => {
  const { city } = req.body;
  const { state } = req.body;
  const result = await cities.lookupByCityState(city, state);
  res.render(
    'lookupByCityStateView',
    { cityD: city, stateD: state, data1: result.data },
  );
});

// GET request use the name routing city and state parameters
app.get('/city/:city/state/:state', async (req, res) => {
	const { city } = req.params;
  const { state } = req.params;
  const result = await cities.lookupByCityState(city, state);
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
app.get('/pop', async (req, res) => {
	const { state } = req.query;
  if (state) {
    const result = await cities.getPopulationByState(state);
    res.render('populationView', { state: result.state, pop: result.pop });
  } else {
    res.render('populationForm');
  }
});

// requests Use the named routing state parameter
app.get('/pop/:state', async (req, res) => {
	const { state } = req.params;
  const result = await cities.getPopulationByState(state);
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

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.listen(3000, function(){
  console.log('http://localhost:3000');
});
