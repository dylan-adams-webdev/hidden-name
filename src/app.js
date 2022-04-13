if (process.env.USER) require('dotenv').config();
const express = require('express');
const logger = require('./config/logger');
const cors = require('cors');
const moviesRouter = require('./routes/movies/movies.router');
const theatersRouter = require('./routes/theaters/theaters.router');
const notFound = require('./errors/notFound');
const errorHandler = require('./errors/errorHandler');
const app = express();

app.use(logger);
app.use(cors());
app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter);

app.use(notFound);
app.use(errorHandler);
module.exports = app;
