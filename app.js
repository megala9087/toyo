const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors');
const EmployeeRoute = require('./routes/Employee');
const CamereRoute = require('./routes/Camera');
const CamereEventRoute = require('./routes/CamereEvents');

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from your Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
}));

  
app.use(parser.json());
app.use(express.json());

app.use('/api/user', EmployeeRoute);
app.use('/api/user', CamereRoute);
app.use('/api/user', CamereEventRoute);

module.exports = app;
