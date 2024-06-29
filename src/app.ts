import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import httpStatus from 'http-status';

import morgan from './config/morgan.config';
import baseRouter from './routes/v1';
import ApiError from './utils/apiError';
import config from './config/env.config';

const app = express();

// Morgan will handle logging HTTP requests
// Winston logger will take care of your application-specific logs
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Gzip compression
app.use(compression());

// Enable cors on all routes
app.use(cors());

// Prevent NoSQL query injection attacks
app.use(mongoSanitize());

// Reroute all API request starting with "/v1" route
app.use('/v1', baseRouter);

// Send back a 404 error for any unknown API requests
app.all('*', (req, res, next) =>
  next(new ApiError(`Cannot find ${req.originalUrl} at this server`, httpStatus.NOT_FOUND))
);

export default app;
