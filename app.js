const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Fetch countries
app.get('/api/countries', (req, res) => {
  res.json(Object.keys(data.countries));
});

// Fetch states based on country
app.get('/api/states/:country', (req, res) => {
  const country = req.params.country;
  const states = data.countries[country] || [];
  res.json(states);
});

// Fetch cities based on state
app.get('/api/cities/:state', (req, res) => {
  const state = req.params.state;
  const cities = data.cities[state] || [];
  res.json(cities);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
